variable "cloudflare_account_id" {
  description = "Cloudflare account that owns the Worker. Same value as CLOUDFLARE_ACCOUNT_ID in the operator inputs."
  type        = string
}

variable "worker_name" {
  description = "Name of the deployed Worker that serves this site. Must match the `name` field in wrangler.jsonc -- wrangler deploys the code, this root only attaches durable resources to it."
  type        = string
  default     = "webcv"
}

variable "attach_custom_domains" {
  description = "Whether to attach the production custom domains to the Worker. Stays false until R11 does the DNS cutover: the resources are declared ahead of time so the switch is a reviewable `tofu plan` rather than dashboard clicks, and R11 flips this flag with the operator's go-ahead per domain."
  type        = bool
  default     = false
}
