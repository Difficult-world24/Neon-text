import React from "react";
import { useEffect } from "react";
import "../App.css";

export function CanvasExample() {
  function evaluate() {
    const canvas = document.querySelector("canvas");

    const ctx = canvas.getContext("2d");

    // ctx.filter = "grayscale(1)";
    ctx.font = "90px Marc Script,cursive";
    ctx.fillText("e", 50, 150, 30, 20);

    // ctx.beginPath();
    // ctx.rect(52, 107, 30, 45);

    // ctx.stroke();

    // ctx.closePath();

    // const image = document.querySelector("#source");

    // image.onload = function () {
    //   ctx.drawImage(image, 10, 10, 102, 84);
    const result = {};
    for (let i = 52; i < 82; i++) {
      for (let j = 107; j < 152; j++) {
        const { data: color } = ctx.getImageData(i, j, 1, 1);
        if (result[color[0]]) {
          result[color[0]]++;
        } else {
          result[color[0]] = 1;
        }
      }
    }

    console.log("result", result, result[65] / 40);

    //   let count = 0;
    //   for (let i = 10; i < 50; i++) {
    //     const { data: color } = ctx.getImageData(i, 13, 1, 1);
    //     console.log("color", color);

    //     if ((color[0] = 65)) {
    //       count++;
    //     }
    //     if (result[color[0]]) {
    //       result[color[0]]++;
    //     } else {
    //       result[color[0]] = 1;
    //     }
    //   }
    //   console.log("result", result, result[65] / 40);
    // };
  }

  useEffect(() => {
    evaluate();
  }, []);

  return (
    <>
      <canvas
        id="canvas"
        width={300}
        height={300}
        style={{ border: "grey solid 1px" }}
      ></canvas>
      <div style={{ fontFamily: "Mark Script,cursive" }}>eh</div>
      <div style={{ display: "none" }}>
        <img id="source" src="/e.png" />
      </div>
    </>
  );
}
