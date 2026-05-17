# Anomaly Log Hunter Architecture

## Purpose

`anomaly-log-hunter` models the traffic-forensics layer that sits between raw access logs and incident or growth decisions. It turns suspicious bursts, scraper loops, and replay patterns into clear priorities before bad traffic distorts resilience posture or commercial reporting.

## Application Shape

- `src/app.ts`
  - Express entrypoint
  - HTML routes for overview, anomaly lane, source patterns, verification, and docs
  - JSON routes for summary, anomaly lane, source patterns, and sample payloads
- `src/data/sampleLogs.ts`
  - modeled access-log anomaly events
  - source-pattern fingerprints
  - executive impact framing
- `src/services/logHunterService.ts`
  - summary calculations
  - machine-readable anomaly outputs
  - verification claims
- `src/services/render.ts`
  - operator UI shell
  - overview metrics and anomaly tables
  - source-pattern clustering views

## Control Surface Logic

### Overview
- shows how many anomalies are active and how severe they are
- translates noisy traffic into impact and blocked-rate language
- keeps the business cost visible for Growth, Security, and Platform teams

### Anomaly Lane
- makes event-level suspicious traffic decisions legible
- compares category, request velocity, source fingerprint, and impact
- demonstrates how forensic visibility happens before traffic is normalized into “just more sessions”

### Source Patterns
- summarizes the fingerprint clusters that deserve containment first
- keeps repeated paths, ASN context, and request counts visible together
- helps explain why pattern clustering belongs in both traffic integrity and incident readiness

### Verification
- lists the core claims the build is proving
- keeps the README screenshots tied to real modeled behavior

## Why This Repo Matters

The repo shows how log analysis can be framed as revenue and resilience infrastructure:

- cleaner incident triage
- less confusion between marketing spikes and malicious spikes
- better protection for pricing, auth, and campaign-adjacent routes
- stronger trust between Growth, Security, and Platform Engineering
