const TextToSVG = require("text-to-svg");
const textToSVG = TextToSVG.loadSync();
const express = require("express");
const app = express();
const port = 3001;
app.get("/", (req, res) => {
const attributes = { stroke: "black", fill: "red" };
const options = {
  x: 0,
  y: 0,
  fontSize: 86,
  anchor: "left top",
  attributes: attributes,
};
// const svg = textToSVG.getD("|", options);
const metrecis = textToSVG.getMetrics(req.query.text, options);
// console.log("metrics", metrecis);
// console.log("path", svg);
return res.json({
  path: textToSVG.getPath(req.query.text, options),
  metric: metrecis,
});
});
app.get("/report", (req, res) => {
const attributes = { stroke: "black", fill: "red" };
const options = {
  x: 0,
  y: 0,
  fontSize: req.query.font,
  anchor: "left top",
  attributes: attributes,
};
const characters = req.query.text.trim().split("");
const resp = [];
characters.forEach((r) => {
  resp.push(textToSVG.getSVG(r, options));
});
return res.json(resp);
});
app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});