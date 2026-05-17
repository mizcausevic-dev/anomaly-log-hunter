import { payload, summary } from "../src/services/logHunterService";

console.log("anomaly-log-hunter demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().sources, null, 2));
