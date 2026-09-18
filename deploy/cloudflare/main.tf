terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }

  required_version = ">= 1.5"

  # Same bucket and locking the homelab repo's dns/ root uses, different key.
  backend "s3" {
    bucket       = "homelab-tfstate-536358936216"
    key          = "webcv/cloudflare/terraform.tfstate"
    region       = "eu-central-1"
    use_lockfile = true
  }
}

# Reads CLOUDFLARE_API_TOKEN from the environment -- never put the token in a
# variable, a tfvars file, or this state.
provider "cloudflare" {}
