# Production custom domains for burbn.de.
#
# NOT attached yet: `attach_custom_domains` defaults to false, so a plan run
# today is empty. burbn.de currently serves from the Hetzner deployment; R11
# flips this flag with the operator's go-ahead and `tofu apply` moves the
# domain to this Worker, replacing the Hetzner A records. Declaring the
# resources before the cutover is the point -- the switch should be a plan
# somebody can read, not a dashboard click nobody can reproduce.
#
# zone_id is deliberately omitted (optional + computed): the provider resolves
# it from the hostname. burbn.de's zone already lives in the homelab repo's
# dns/ root, which stays the owner of the zone and its records.

resource "cloudflare_workers_custom_domain" "apex" {
  count = var.attach_custom_domains ? 1 : 0

  account_id = var.cloudflare_account_id
  hostname   = "burbn.de"
  service    = var.worker_name
}

resource "cloudflare_workers_custom_domain" "www" {
  count = var.attach_custom_domains ? 1 : 0

  account_id = var.cloudflare_account_id
  hostname   = "www.burbn.de"
  service    = var.worker_name
}
