import express from "express";

import { anomalyLane, payload, sourcePatterns, summary, verification } from "./services/logHunterService";
import {
  renderAnomalyLane,
  renderDocs,
  renderOverview,
  renderSourcePatterns,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5360);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/anomaly-lane", (_req, res) => res.type("html").send(renderAnomalyLane()));
app.get("/source-patterns", (_req, res) => res.type("html").send(renderSourcePatterns()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/anomaly-lane", (_req, res) => res.json(anomalyLane()));
app.get("/api/source-patterns", (_req, res) => res.json(sourcePatterns()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Anomaly Log Hunter listening on http://127.0.0.1:${port}`);
  });
}

export default app;
