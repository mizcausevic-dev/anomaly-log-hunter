export type ThreatLevel = "healthy" | "watch" | "critical";
export type LogCategory = "scraping" | "credential-stuffing" | "burst-abuse" | "synthetic-traffic" | "scanner-noise";

export interface AnomalyEvent {
  id: string;
  category: LogCategory;
  severity: ThreatLevel;
  source: string;
  requestBurstPerMinute: number;
  statusMix: string;
  affectedRoutes: string[];
  blockedPct: number;
  estimatedImpactUsd: number;
  explanation: string;
}

export interface SourcePattern {
  id: string;
  fingerprint: string;
  severity: ThreatLevel;
  topAsn: string;
  topCountry: string;
  repeatedPaths: string[];
  requestCount: number;
  explanation: string;
}

export const anomalyEvents: AnomalyEvent[] = [
  {
    id: "LOG-9012",
    category: "scraping",
    severity: "critical",
    source: "Headless Chromium cluster",
    requestBurstPerMinute: 1380,
    statusMix: "200 / 304 / 429",
    affectedRoutes: ["/pricing", "/case-studies", "/api/search"],
    blockedPct: 76,
    estimatedImpactUsd: 1140,
    explanation: "Pricing and proof pages are being harvested at a rate that threatens competitive intelligence leakage and analytics trust."
  },
  {
    id: "LOG-9007",
    category: "credential-stuffing",
    severity: "critical",
    source: "Rotating proxy farm",
    requestBurstPerMinute: 910,
    statusMix: "401 / 403 / 429",
    affectedRoutes: ["/login", "/wp-login.php", "/admin"],
    blockedPct: 81,
    estimatedImpactUsd: 890,
    explanation: "Authentication endpoints are seeing distributed replay behavior that would distort incident posture if treated as normal traffic."
  },
  {
    id: "LOG-8998",
    category: "synthetic-traffic",
    severity: "watch",
    source: "Low-trust referral wave",
    requestBurstPerMinute: 420,
    statusMix: "200 / 200 / 302",
    affectedRoutes: ["/blog/launch", "/ebook", "/contact"],
    blockedPct: 31,
    estimatedImpactUsd: 340,
    explanation: "Referral sessions look healthy at first glance but cluster too tightly around shallow routes and improbable timing windows."
  },
  {
    id: "LOG-8984",
    category: "burst-abuse",
    severity: "watch",
    source: "Promo-code enumeration",
    requestBurstPerMinute: 260,
    statusMix: "200 / 404 / 429",
    affectedRoutes: ["/checkout", "/promo/apply"],
    blockedPct: 54,
    estimatedImpactUsd: 210,
    explanation: "Checkout-adjacent paths are seeing code-guessing bursts that can distort conversion telemetry and trigger false drop-off analysis."
  },
  {
    id: "LOG-8979",
    category: "scanner-noise",
    severity: "healthy",
    source: "Verified security scanner",
    requestBurstPerMinute: 90,
    statusMix: "200 / 200 / 200",
    affectedRoutes: ["/", "/robots.txt", "/sitemap.xml"],
    blockedPct: 0,
    estimatedImpactUsd: 0,
    explanation: "Expected diagnostic traffic that should remain visible but not be treated as an abuse event."
  }
];

export const sourcePatternsData: SourcePattern[] = [
  {
    id: "SRC-01",
    fingerprint: "Chrome 124 + null viewport + pricing loop",
    severity: "critical",
    topAsn: "AS16509",
    topCountry: "US",
    repeatedPaths: ["/pricing", "/pricing/enterprise", "/compare"],
    requestCount: 4120,
    explanation: "The same browser fingerprint is sweeping commercial pages with zero scroll variance, which is more scraper than buyer."
  },
  {
    id: "SRC-02",
    fingerprint: "Distributed login replay",
    severity: "critical",
    topAsn: "AS8075",
    topCountry: "DE",
    repeatedPaths: ["/login", "/wp-login.php", "/oauth/callback"],
    requestCount: 2870,
    explanation: "Credential-stuffing attempts are rotating IPs but keeping the same path cadence and header inconsistencies."
  },
  {
    id: "SRC-03",
    fingerprint: "Referral ghost sessions",
    severity: "watch",
    topAsn: "AS12389",
    topCountry: "NL",
    repeatedPaths: ["/ebook", "/contact", "/thank-you"],
    requestCount: 1640,
    explanation: "These sessions mimic campaign traffic well enough to pollute attribution unless their pathing and timing are inspected together."
  }
];
