import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

import {
  renderAnomalyLane,
  renderDocs,
  renderOverview,
  renderSourcePatterns,
  renderVerification
} from "../src/services/render";

const siteDir = join(process.cwd(), "site");

mkdirSync(siteDir, { recursive: true });

const routes = [
  { path: "index.html", content: renderOverview() },
  { path: "anomaly-lane/index.html", content: renderAnomalyLane() },
  { path: "source-patterns/index.html", content: renderSourcePatterns() },
  { path: "verification/index.html", content: renderVerification() },
  { path: "docs/index.html", content: renderDocs() }
];

for (const route of routes) {
  const output = join(siteDir, route.path);
  mkdirSync(join(output, ".."), { recursive: true });
  writeFileSync(output, route.content, "utf8");
}

writeFileSync(
  join(siteDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: http://anomaly.kineticgain.com/sitemap.xml\n`,
  "utf8"
);

writeFileSync(
  join(siteDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>http://anomaly.kineticgain.com/</loc></url>\n  <url><loc>http://anomaly.kineticgain.com/anomaly-lane/</loc></url>\n  <url><loc>http://anomaly.kineticgain.com/source-patterns/</loc></url>\n  <url><loc>http://anomaly.kineticgain.com/verification/</loc></url>\n  <url><loc>http://anomaly.kineticgain.com/docs/</loc></url>\n</urlset>\n`,
  "utf8"
);
