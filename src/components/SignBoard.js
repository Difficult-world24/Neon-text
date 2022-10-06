import React, { useEffect, useRef, useState } from "react";
import interact from "interactjs";

const maxWidth = "500pt";
const maxheight = "360pt";
const position = {
  x: 100,
  y: 200,
};
function convertPointToUnits(point, unit) {
  let size = point;

  switch (unit) {
    case "in":
      size = size * 0.0138889;
      break;
    case "cm":
      size = size * 0.0352778;
      break;
    case "mm":
      size = size * 0.352778;
  }

  return size;
}

function convertPixelsToUnit(value) {
  //   return value;
  return value * 0.7;
}

function convertUnitToPoint(point, unit) {
  let size = point;

  switch (unit) {
    case "in":
      size = size / 0.0138889;
      break;
    case "cm":
      size = size / 0.0352778;
      break;
    case "mm":
      size = size / 0.352778;
  }

  return size;
}
export const SignBoard = () => {
  const [canvasSize, setCanvasSize] = useState({
    width: "480",
    height: "360",
  });

  const [textSize, setTextSize] = useState({
    width: "102.98",
    height: "84.98",
  });

  const [selectedUnit, setSlectedUnit] = useState("mm");
  useEffect(() => {
    interact(".canvas").resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },

      listeners: {
        move(event) {
          var target = event.target;
          var x = parseFloat(target.getAttribute("data-x")) || 0;
          var y = parseFloat(target.getAttribute("data-y")) || 0;

          // update the element's style
          // target.style.width = event.rect.width + "px";
          // target.style.height = event.rect.height + "px";
          //   setCanvasWidth(Math.floor(event.rect.width));
          //   setCanvasHeight(Math.floor(event.rect.height));

          setCanvasSize({
            width: Math.floor(event.rect.width),
            height: Math.floor(event.rect.height),
          });
          // translate when resizing from top or left edges
          //   x += event.deltaRect.left;
          //   y += event.deltaRect.top;

          //   target.style.transform = "translate(" + x + "px," + y + "px)";

          //   target.setAttribute("data-x", x);
          //   target.setAttribute("data-y", y);
        },
      },
      inertia: true,
      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: "parent",
        }),

        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 100, height: 50 },
          max: { width: 500, height: 360 },
        }),
      ],
    });

    interact(".board_box")
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        listeners: {
          move(event) {
            var target = event.target;
            var x = parseFloat(target.getAttribute("data-x")) || 0;
            var y = parseFloat(target.getAttribute("data-y")) || 0;

            // update the element's style
            // target.style.width = event.rect.width + "px";
            // target.style.height = event.rect.height + "px";
            //   setCanvasWidth(Math.floor(event.rect.width));
            //   setCanvasHeight(Math.floor(event.rect.height));

            setTextSize({
              width: Math.floor(event.rect.width),
              height: Math.floor(event.rect.height),
            });
            // translate when resizing from top or left edges
            //   x += event.deltaRect.left;
            //   y += event.deltaRect.top;

            //   target.style.transform = "translate(" + x + "px," + y + "px)";

            //   target.setAttribute("data-x", x);
            //   target.setAttribute("data-y", y);
          },
        },
        inertia: true,
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: "canvas",
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 100, height: 50 },
            max: { width: 500, height: 360 },
          }),
        ],
      })
      .draggable({
        inertia: true,
        listeners: {
          move(event) {
            position.x += event.dx;
            position.y += event.dy;
            event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
          },
        },
      });
    // getText();
  }, []);

  function getText() {
    let input = document.querySelector(".input").value;
    fetch(`http://localhost:3001/?text=${input}`)
      .then((j) => j.json())
      .then((data) => {
        const target = document.querySelector("svg");
        target.innerHTML = data.path;
        const { xMin, xMax, yMin, yMax } = [...target.children].reduce(
          (acc, el) => {
            const { x, y, width, height } = el.getBBox();
            if (!acc.xMin || x < acc.xMin) acc.xMin = x;
            if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
            if (!acc.yMin || y < acc.yMin) acc.yMin = y;
            if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
            return acc;
          },
          {}
        );
        const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;
        target.setAttribute("viewBox", viewbox);
      });
  }

  return (
    <>
      <div
        className="parent"
        style={{
          border: "grey solid 1px",
          width: maxWidth,
          height: maxheight,
          padding: "16px",
        }}
      >
        <div
          className="canvas"
          style={{
            border: "grey  dotted 1px",
            width: `${canvasSize.width}pt`,
            height: `${canvasSize.height}pt`,
            position: "relative",
          }}
        >
          <div
            className="board_box"
            style={{
              border: "white dashed 1px",
              width: `${textSize.width}pt`,
              height: `${textSize.height}pt`,
              position: "absolute",
              top: position.x,
              left: position.y,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: `${textSize.width}pt`,
                height: `${textSize.height}pt`,
              }}
            ></svg>
          </div>
          <img src="/bg.avif" style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
      <div>
        <input
          type={"number"}
          value={convertPointToUnits(canvasSize.width, selectedUnit)}
          onChange={(e) => {
            setCanvasSize((o) => ({
              ...o,
              width: convertUnitToPoint(e.target.value, selectedUnit),
            }));
          }}
        />
        <input
          type={"number"}
          value={convertPointToUnits(canvasSize.height, selectedUnit)}
          onChange={(e) => {
            setCanvasSize((o) => ({
              ...o,
              height: convertUnitToPoint(e.target.value, selectedUnit),
            }));
          }}
        />
        <select
          value={selectedUnit}
          onChange={(e) => {
            setSlectedUnit(e.target.value);
          }}
        >
          <option value="mm">Milimeters</option>
          <option value="cm">Centemeter</option>
          <option value="in">Inches</option>
        </select>
      </div>
      <div>
        <input
          type={"number"}
          value={convertPointToUnits(textSize.width, selectedUnit)}
          onChange={(e) => {
            setTextSize((o) => ({
              ...o,
              width: convertUnitToPoint(e.target.value, selectedUnit),
            }));
          }}
        />
        <input
          type={"number"}
          value={convertPointToUnits(textSize.height, selectedUnit)}
          onChange={(e) => {
            setTextSize((o) => ({
              ...o,
              height: convertUnitToPoint(e.target.value, selectedUnit),
            }));
          }}
        />
      </div>
      <div>
        <input className="input" value="||" />
        <button
          onClick={() => {
            getText();
          }}
        >
          Add Text
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            const input = document.querySelector(".input").value;

            const fontSize = convertPixelsToUnit(
              document.querySelector("svg path").getBoundingClientRect().height
            );

            fetch(`http://localhost:3001/report?text=${input}&font=${fontSize}`)
              .then((j) => j.json())
              .then((data) => {
                const target = document.querySelector(".report");

                data.forEach((character) => {
                  let e = document.createElement("div");
                  e.innerHTML = character;
                  let stats = document.createElement("div");

                  //   let tempSvg = e.querySelector("svg");

                  //   tempSvg.setAttribute(
                  //     "style",
                  //     `width:${
                  //       convertPointToUnits(
                  //         tempSvg.getAttribute("width"),
                  //         selectedUnit
                  //       ) + "mm"
                  //     };height:${
                  //       convertPointToUnits(
                  //         tempSvg.getAttribute("height"),
                  //         selectedUnit
                  //       ) + "mm"
                  //     }`
                  //   );

                  stats.innerHTML = `
                 Total Length:${convertPointToUnits(
                   e.querySelector("path").getTotalLength() / 2,
                   selectedUnit
                 )}${selectedUnit}
,
                 ${e.querySelector("path").getTotalLength() / 2}pt
                 `;

                  e.appendChild(stats);
                  target.appendChild(e);

                  document
                    .querySelectorAll(".report svg")
                    .forEach((tempSvg) => {
                      const { xMin, xMax, yMin, yMax } = [
                        ...tempSvg.children,
                      ].reduce((acc, el) => {
                        const { x, y, width, height } = el.getBBox();
                        if (!acc.xMin || x < acc.xMin) acc.xMin = x;
                        if (!acc.xMax || x + width > acc.xMax)
                          acc.xMax = x + width;
                        if (!acc.yMin || y < acc.yMin) acc.yMin = y;
                        if (!acc.yMax || y + height > acc.yMax)
                          acc.yMax = y + height;
                        return acc;
                      }, {});
                      const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${
                        yMax - yMin
                      }`;
                      tempSvg.setAttribute("viewBox", viewbox);
                    });
                });
              });
          }}
        >
          Get Report
        </button>
        <div className="report"></div>
      </div>
    </>
  );
};
