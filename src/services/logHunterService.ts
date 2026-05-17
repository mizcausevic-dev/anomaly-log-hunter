import { anomalyEvents, sourcePatternsData } from "../data/sampleLogs";

export function summary() {
  const critical = anomalyEvents.filter((event) => event.severity === "critical").length;
  const watch = anomalyEvents.filter((event) => event.severity === "watch").length;
  const blockedAverage = Math.round(
    anomalyEvents.reduce((total, event) => total + event.blockedPct, 0) / anomalyEvents.length
  );
  const estimatedImpactUsd = anomalyEvents.reduce((total, event) => total + event.estimatedImpactUsd, 0);

  return {
    anomalyCount: anomalyEvents.length,
    critical,
    watch,
    blockedAverage,
    estimatedImpactUsd,
    recommendation:
      "Tighten pricing-page scraper suppression first, because that lane combines the highest request burst with the biggest commercial leakage."
  };
}

export function anomalyLane() {
  return anomalyEvents;
}

export function sourcePatterns() {
  return sourcePatternsData;
}

export function verification() {
  return [
    "Log anomalies are modeled in business language so suspicious traffic can be prioritized before it distorts reporting or incident response.",
    "Source-pattern clustering makes it clear when noisy sessions are still human-adjacent and when they deserve stronger suppression.",
    "Blocked-rate and impact framing help Growth and Security share one view of whether abuse is already costing pipeline or just creating noise."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    anomalies: anomalyLane(),
    sources: sourcePatterns(),
    verification: verification()
  };
}
