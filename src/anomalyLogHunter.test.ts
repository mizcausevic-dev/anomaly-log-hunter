import { describe, expect, it } from "vitest";

import { anomalyLane, payload, sourcePatterns, summary } from "./services/logHunterService";

describe("anomaly-log-hunter", () => {
  it("summary exposes forensic posture", () => {
    const result = summary();

    expect(result.anomalyCount).toBeGreaterThan(0);
    expect(result.estimatedImpactUsd).toBeGreaterThan(0);
    expect(result.recommendation).toContain("pricing");
  });

  it("anomaly and source data stay commercially legible", () => {
    expect(anomalyLane().length).toBeGreaterThan(1);
    expect(sourcePatterns().some((source) => source.fingerprint.toLowerCase().includes("pricing"))).toBe(true);
  });

  it("payload bundles the full surface", () => {
    const result = payload();

    expect(result.dashboard.anomalyCount).toBe(result.anomalies.length);
    expect(result.sources.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
