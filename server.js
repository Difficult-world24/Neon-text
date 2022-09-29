const TextToSVG = require("text-to-svg");
const textToSVG = TextToSVG.loadSync();

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const attributes = { stroke: "black", fill: "red" };
  const options = {
    x: 0,
    y: 0,
    fontSize: 264,
    anchor: "left top",
    attributes: attributes,
  };

  const svg = textToSVG.getSVG("E", options);
  const metrecis = textToSVG.getMetrics("E", options);
  return res.json({
    svg: svg,
    metric: metrecis,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
