import { anomalyLane, sourcePatterns, summary, verification } from "./logHunterService";

function layout(title: string, activePath: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/anomaly-lane", label: "Anomaly Lane" },
    { href: "/source-patterns", label: "Source Patterns" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ]
    .map((item) => {
      const active = item.href === activePath ? "nav-chip active" : "nav-chip";
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root {
        --bg: #08111b;
        --panel-soft: rgba(18, 29, 45, 0.86);
        --line: rgba(153, 181, 255, 0.15);
        --text: #f4f7ff;
        --muted: #9eb0cf;
        --accent: #63c7ff;
        --accent-strong: #7e72ff;
        --good: #33d69f;
        --watch: #f0bf54;
        --bad: #ff758f;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", Inter, sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(99, 199, 255, 0.14), transparent 28%),
          radial-gradient(circle at top right, rgba(126, 114, 255, 0.14), transparent 26%),
          linear-gradient(180deg, #06101a 0%, var(--bg) 100%);
      }
      a { color: inherit; text-decoration: none; }
      .shell { max-width: 1280px; margin: 0 auto; padding: 28px 28px 40px; }
      .topbar {
        display: flex; justify-content: space-between; align-items: center; gap: 20px;
        padding: 16px 18px; border: 1px solid var(--line); border-radius: 24px;
        background: rgba(7, 14, 26, 0.82); box-shadow: 0 16px 60px rgba(0, 0, 0, 0.28);
      }
      .brand { display: flex; align-items: center; gap: 14px; }
      .brand-mark {
        width: 42px; height: 42px; display: grid; place-items: center; border-radius: 14px;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
        font-weight: 800;
      }
      .eyebrow {
        margin: 0 0 2px; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; color: #93c9ff;
      }
      .brand-title { margin: 0; font-size: 24px; font-weight: 700; }
      .brand-subtitle { margin: 4px 0 0; color: var(--muted); font-size: 14px; }
      nav { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
      .nav-chip {
        padding: 12px 16px; border-radius: 999px; border: 1px solid var(--line);
        background: rgba(16, 27, 43, 0.9); color: #d7e6ff; font-size: 13px;
        letter-spacing: 0.06em; text-transform: uppercase;
      }
      .nav-chip.active {
        background: linear-gradient(135deg, rgba(99, 199, 255, 0.95), rgba(126, 114, 255, 0.92));
        border-color: transparent; color: white; box-shadow: 0 10px 24px rgba(86, 136, 255, 0.32);
      }
      .hero {
        margin-top: 24px; padding: 30px 30px 34px; border-radius: 30px; border: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(13, 24, 40, 0.95), rgba(9, 19, 33, 0.92));
        box-shadow: 0 20px 70px rgba(0, 0, 0, 0.24);
      }
      .hero h1 {
        margin: 8px 0 10px; max-width: 940px; font-size: clamp(40px, 4.9vw, 68px);
        line-height: 0.96; letter-spacing: -0.04em;
      }
      .hero p { max-width: 860px; margin: 0; font-size: 21px; line-height: 1.5; color: #b8c8e4; }
      .section { margin-top: 24px; display: grid; gap: 20px; }
      .metrics { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; }
      .panel { padding: 22px; border-radius: 26px; border: 1px solid var(--line); background: var(--panel-soft); }
      .metric-label { color: #8fb6ea; letter-spacing: 0.18em; font-size: 12px; text-transform: uppercase; }
      .metric-value { margin-top: 14px; font-size: 44px; font-weight: 750; line-height: 1; }
      .metric-copy { margin-top: 12px; font-size: 14px; color: var(--muted); line-height: 1.5; }
      .cols-2 { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 20px; }
      .cols-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
      .table { width: 100%; border-collapse: collapse; margin-top: 14px; }
      .table th, .table td {
        padding: 14px 10px; border-bottom: 1px solid rgba(143, 182, 234, 0.11);
        text-align: left; vertical-align: top;
      }
      .table th { color: #8fb6ea; font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; }
      .table td { color: #e9f1ff; font-size: 14px; line-height: 1.45; }
      .badge { display: inline-flex; align-items: center; padding: 6px 10px; border-radius: 999px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; }
      .healthy { background: rgba(51, 214, 159, 0.14); color: var(--good); }
      .watch { background: rgba(240, 191, 84, 0.14); color: var(--watch); }
      .critical { background: rgba(255, 117, 143, 0.14); color: var(--bad); }
      .section-title { margin: 0; font-size: 28px; line-height: 1.1; }
      .section-copy { margin: 10px 0 0; color: var(--muted); font-size: 16px; line-height: 1.55; }
      ul.clean { margin: 16px 0 0; padding-left: 18px; color: #dbe7fb; }
      ul.clean li { margin-top: 10px; line-height: 1.5; }
      .footer-note { margin-top: 20px; color: #88a5d4; font-size: 13px; letter-spacing: 0.04em; }
      @media (max-width: 1100px) {
        .metrics, .cols-2, .cols-3 { grid-template-columns: 1fr; }
        nav { justify-content: flex-start; }
        .topbar { flex-direction: column; align-items: flex-start; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">AL</div>
          <div>
            <p class="eyebrow">Traffic Integrity</p>
            <h1 class="brand-title">Anomaly Log Hunter</h1>
            <p class="brand-subtitle">Forensic visibility for suspicious traffic before it distorts incidents or growth signals.</p>
          </div>
        </div>
        <nav>${nav}</nav>
      </header>
      ${body}
    </main>
  </body>
</html>`;
}

export function renderOverview() {
  const stats = summary();
  const signalMarkup = sourcePatterns()
    .map(
      (signal) => `
      <tr>
        <td>${signal.fingerprint}</td>
        <td><span class="badge ${signal.severity}">${signal.severity}</span></td>
        <td>${signal.requestCount}</td>
        <td>${signal.topAsn}</td>
        <td>${signal.explanation}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Log Analysis Control Plane</p>
      <h1>Suspicious traffic should be explainable before it becomes false incident noise.</h1>
      <p>Parse access-log anomalies, cluster repeated fingerprints, and turn noisy traffic bursts into business-facing risk signals for Growth, Security, and Platform teams.</p>
    </section>
    <section class="section">
      <div class="metrics">
        <article class="panel">
          <div class="metric-label">Anomalies</div>
          <div class="metric-value">${stats.anomalyCount}</div>
          <div class="metric-copy">Modeled log events currently moving through the anomaly-review lane.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Critical</div>
          <div class="metric-value">${stats.critical}</div>
          <div class="metric-copy">High-severity behaviors that deserve containment or forensic review first.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Watch</div>
          <div class="metric-value">${stats.watch}</div>
          <div class="metric-copy">Patterns that are suspicious enough to distort reporting if ignored.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Blocked Avg</div>
          <div class="metric-value">${stats.blockedAverage}%</div>
          <div class="metric-copy">Average suppression coverage across the modeled anomaly set.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Impact</div>
          <div class="metric-value">$${stats.estimatedImpactUsd}</div>
          <div class="metric-copy">Estimated commercial cost if the abnormal traffic is left unresolved.</div>
        </article>
      </div>
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Recommendation</p>
          <h2 class="section-title">What to contain next</h2>
          <p class="section-copy">${stats.recommendation}</p>
          <p class="footer-note">Best use case: protect pricing, login, and campaign-adjacent routes before abuse changes incident posture or growth reporting.</p>
        </article>
        <article class="panel">
          <p class="eyebrow">Coverage</p>
          <h2 class="section-title">What this repo makes legible</h2>
          <ul class="clean">
            <li><strong>Scraper loops</strong> — commercial pages harvested at inhuman request velocity.</li>
            <li><strong>Credential stuffing</strong> — replay behavior that should not blend into ordinary auth traffic.</li>
            <li><strong>Synthetic referrals</strong> — sessions that look campaign-shaped until their fingerprints are clustered.</li>
          </ul>
        </article>
      </div>
      <article class="panel">
        <p class="eyebrow">Source Patterns</p>
        <h2 class="section-title">The fingerprints most likely to distort incident and growth truth.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Fingerprint</th>
              <th>Severity</th>
              <th>Requests</th>
              <th>Top ASN</th>
              <th>Why it matters</th>
            </tr>
          </thead>
          <tbody>${signalMarkup}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Anomaly Log Hunter", "/", body);
}

export function renderAnomalyLane() {
  const rows = anomalyLane()
    .map(
      (event) => `
      <tr>
        <td>${event.id}</td>
        <td>${event.category}</td>
        <td><span class="badge ${event.severity}">${event.severity}</span></td>
        <td>${event.source}</td>
        <td>${event.requestBurstPerMinute}</td>
        <td>${event.blockedPct}%</td>
        <td>$${event.estimatedImpactUsd}</td>
        <td>${event.explanation}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Anomaly Lane</p>
      <h1>Every suspicious burst gets a business-readable explanation.</h1>
      <p>This lane shows how request cadence, route selection, and block coverage combine into a clear priority queue for abuse containment.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Log Events</p>
        <h2 class="section-title">Anomaly posture by category and source.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Severity</th>
              <th>Source</th>
              <th>Burst / Min</th>
              <th>Blocked</th>
              <th>Impact</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Anomaly Log Hunter - Anomaly Lane", "/anomaly-lane", body);
}

export function renderSourcePatterns() {
  const cards = sourcePatterns()
    .map(
      (source) => `
      <article class="panel">
        <p class="eyebrow">Pattern ${source.id}</p>
        <h2 class="section-title">${source.fingerprint}</h2>
        <p class="section-copy">${source.explanation}</p>
        <div class="cols-3" style="margin-top:16px;">
          <div>
            <div class="metric-label">Severity</div>
            <div class="metric-value" style="font-size:28px;"><span class="badge ${source.severity}">${source.severity}</span></div>
          </div>
          <div>
            <div class="metric-label">Top ASN</div>
            <div class="metric-value" style="font-size:34px;">${source.topAsn}</div>
          </div>
          <div>
            <div class="metric-label">Requests</div>
            <div class="metric-value" style="font-size:34px;">${source.requestCount}</div>
          </div>
        </div>
        <p class="footer-note">Repeated paths: ${source.repeatedPaths.join(", ")}</p>
      </article>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Source Patterns</p>
      <h1>Traffic fingerprints matter more than one noisy IP at a time.</h1>
      <p>Clustered source patterns show whether unusual traffic is just background noise or a coordinated behavior that needs stronger suppression and better incident context.</p>
    </section>
    <section class="section">
      ${cards}
    </section>`;

  return layout("Anomaly Log Hunter - Source Patterns", "/source-patterns", body);
}

export function renderVerification() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Verification</p>
      <h1>This build proves log forensics belongs in the revenue and resilience stack.</h1>
      <p>The point is not raw log volume. The point is exposing which traffic patterns are already shaping growth metrics, platform strain, or incident response decisions.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Release Checks</p>
        <h2 class="section-title">What this repo validates</h2>
        <ul class="clean">
          ${verification().map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    </section>`;

  return layout("Anomaly Log Hunter - Verification", "/verification", body);
}

export function renderDocs() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Docs</p>
      <h1>Modeled as a traffic-forensics control plane for Growth and Security teams.</h1>
      <p>This repo sits at the intersection of edge security, log analysis, and signal clarity. It is designed to show how suspicious traffic becomes a business and resilience issue, not just an ops detail.</p>
    </section>
    <section class="section">
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Routes</p>
          <h2 class="section-title">UI surface</h2>
          <ul class="clean">
            <li><code>/</code> overview and impact posture</li>
            <li><code>/anomaly-lane</code> event-level anomaly decisions</li>
            <li><code>/source-patterns</code> fingerprint clustering for executive review</li>
            <li><code>/verification</code> release checks and modeling claims</li>
          </ul>
        </article>
        <article class="panel">
          <p class="eyebrow">API</p>
          <h2 class="section-title">Machine-readable outputs</h2>
          <ul class="clean">
            <li><code>/api/dashboard/summary</code></li>
            <li><code>/api/anomaly-lane</code></li>
            <li><code>/api/source-patterns</code></li>
            <li><code>/api/verification</code></li>
            <li><code>/api/sample</code></li>
          </ul>
        </article>
      </div>
    </section>`;

  return layout("Anomaly Log Hunter - Docs", "/docs", body);
}
