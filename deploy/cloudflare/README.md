# Cloudflare resources for burbn.de

OpenTofu root for the durable Cloudflare resources behind this site. Added by
backlog task S10 after the R2–R6 work built the Cloudflare estate with ad hoc
API calls and `wrangler`, leaving nothing re-appliable.

There is no D1 database here: this Worker binds only `ASSETS`,
`WORKER_SELF_REFERENCE` and `IMAGES`, and renders every request live from
Directus with no incremental cache (the R12 decision). The equivalent root in
`website-jb-v2` does own a D1 database, for that site's contact-form queue.

## Why this sits inside `deploy/`

`deploy/` is this repo's one deployment folder, and this root is a subfolder of
it rather than a second top-level IaC directory. The folder's root is a Pulumi
TypeScript project that deploys the site to the Hetzner Kubernetes cluster
(Namespace, Deployment, Ingress, Secret) — that is what serves `burbn.de`
today, and CI runs it from here (`working-directory: deploy` in
`release-prod.yml` and `push.yml`), which is why the Pulumi files stay put.

The two do not overlap: Pulumi owns Hetzner Kubernetes objects, OpenTofu owns
Cloudflare resources. Both exist because the site is mid-migration from one to
the other. When R9 destroys the Hetzner cluster, the Pulumi project and its
workflow steps go with it and `deploy/` is left holding only `cloudflare/`.

## What lives where

Three places own different parts on purpose. Getting this wrong causes two
controllers to fight over one resource, so check here before adding anything.

| Thing | Owned by | Why |
|---|---|---|
| Zone, DNS records | `homelab` repo, `dns/` root (`just dns plan`) | One zone serves more than this site; records are not per-site |
| Workers custom domains | **this root** | Durable, per-site, and outlive any single deploy |
| Worker code and assets | `wrangler deploy` from CI (`.github/workflows/deploy-cloudflare.yml`) | A build artifact. In state it would diff on every asset change |
| Worker secrets | `wrangler secret put` | `cloudflare_workers_secret` writes the plaintext value into state, and this state lives in S3 |

## Usage

```
export CLOUDFLARE_API_TOKEN=...      # never committed; from the operator inputs
export TF_VAR_cloudflare_account_id=...

tofu init
tofu plan
```

The S3 backend uses the same bucket as the homelab `dns/` root, so it needs
valid AWS credentials (`aws login`) as well as the Cloudflare token.

## Custom domains are declared but switched off

`attach_custom_domains` defaults to `false`, so a plan today proposes nothing.
burbn.de still serves from the Hetzner deployment. Backlog task R11 owns the
cutover: it flips this flag with the operator's go-ahead and applies, which
moves the domain to this Worker and replaces the Hetzner A records.
