import * as pulumi from "@pulumi/pulumi";
import * as kubernetes from "@pulumi/kubernetes";
import { getProject, getStack, interpolate } from "@pulumi/pulumi";
import { createGitlabSecret } from "./src/util";
import { authAnnotation } from "./src/globals";
import { Ingress } from "@pulumi/kubernetes/networking/v1";
import { Deployment } from "@pulumi/kubernetes/apps/v1";
import { Secret } from "@pulumi/kubernetes/core/v1";
import { apiextensions } from "@pulumi/kubernetes";

// Get some values from the stack configuration, or use defaults
const config = new pulumi.Config();
const baseUrl = config.get("url") || "default";
const numReplicas = config.getNumber("replicas") || 1;
const stackName = getStack();

const prefix = stackName === "prod" ? "" : stackName;
const url = prefix === "" ? baseUrl : prefix + "." + baseUrl;
const projectName = getProject();
const resourceName = stackName + "-" + projectName;
const k8sNamespace = config.get("namespace") || projectName;

const cmsToken = config.requireSecret("cms-token");
const isrToken = config.requireSecret("isr-token");

const appLabels = {
  name: resourceName,
  app: resourceName,
};

// Create a new namespace
const webServerNs = new kubernetes.core.v1.Namespace(resourceName, {
  metadata: {
    name: resourceName,
  },
});
const ingressAnnotation = stackName === "prod" ? {} : authAnnotation;

// Create a new ConfigMap for the Nginx configuration

//Create Gitlab Secret
const pullSecret = process.env.CI_PULL_SECRET!;
const secret = createGitlabSecret(
  "pulumi",
  pullSecret,
  "gitlab-pull-secret",
  webServerNs
);

// Create a new Deployment with a user-specified number of replicas
// Assume we have a configured Kubernetes provider

// Create Kubernetes secrets from Pulumi config
const isrSecret = new Secret("isr-token-secret", {
  metadata: {
    name: "isr-token-secret",
    namespace: webServerNs.metadata.name,
  },
  stringData: {
    ISR_TOKEN: isrToken,
  },
});

const directusSecret = new Secret("directus-token-secret", {
  metadata: {
    name: "directus-token-secret",
    namespace: webServerNs.metadata.name,
  },
  stringData: {
    DIRECTUS_TOKEN: cmsToken,
  },
});

const deployment = new Deployment(
  resourceName,
  {
    metadata: {
      name: resourceName,
      namespace: webServerNs.metadata.name,
      labels: appLabels,
    },
    spec: {
      strategy: {
        type: "Recreate",
      },
      selector: {
        matchLabels: appLabels,
      },
      template: {
        metadata: {
          labels: appLabels,
        },
        spec: {
          containers: [
            {
              name: resourceName,
              image: process.env.registryImage + ":" + process.env.imageTag,
              imagePullPolicy: "Always",
              resources: {
                requests: {
                  memory: "250Mi",
                  cpu: "300m",
                },
                limits: {
                  memory: "500Mi",
                  cpu: "700m",
                },
              },
              env: [
                {
                  name: "url",
                  value: url,
                },
                {
                  name: "CI_ISR_TOKEN",
                  valueFrom: {
                    secretKeyRef: {
                      name: isrSecret.metadata.name,
                      key: "ISR_TOKEN",
                    },
                  },
                },
                {
                  name: "CI_DIRECTUS_TOKEN",
                  valueFrom: {
                    secretKeyRef: {
                      name: directusSecret.metadata.name,
                      key: "DIRECTUS_TOKEN",
                    },
                  },
                },
              ],
              ports: [
                {
                  name: "http",
                  containerPort: 3000,
                },
              ],
            },
          ],
          imagePullSecrets: [
            { name: pulumi.interpolate`${secret.metadata.name}` },
          ],
        },
      },
    },
  },
  { dependsOn: [isrSecret, directusSecret] }
);

// Expose the Deployment as a Kubernetes Service
const service = new kubernetes.core.v1.Service(resourceName, {
  metadata: {
    namespace: webServerNs.metadata.name,
    name: resourceName,
  },
  spec: {
    ports: [
      {
        name: "http",
        port: 80,
        protocol: "TCP",
        targetPort: "http",
      },
    ],
    selector: appLabels,
  },
});
const ingress = new Ingress(resourceName, {
  metadata: {
    annotations: {
      "kubernetes.io/ingress.class": "traefik",
      "cert-manager.io/cluster-issuer": "letsencrypt",
      ...ingressAnnotation,
    },
    namespace: webServerNs.metadata.name,
  },

  spec: {
    tls: [
      {
        secretName: interpolate`${service.metadata.name}-tls`,
        hosts: [url],
      },
    ],
    rules: [
      {
        host: url,
        http: {
          paths: [
            {
              pathType: "Prefix",
              path: "/",
              backend: {
                service: {
                  name: interpolate`${service.metadata.name}`,
                  port: { number: 80 },
                },
              },
            },
          ],
        },
      },
    ],
  },
});

// Export some values for use elsewhere
export const deploymentName = deployment.metadata.name;
export const serviceName = service.metadata.name;
