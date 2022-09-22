import { Typography, Box, TextField, Grid } from "@mui/material";
import React, { useState } from "react";
import interact from "interactjs";


const restrictToParent = interact.modifiers.restrictRect({
  restriction: "parent",
});

const position = { x: 0, y: 0 };

interact(".ghost")
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move(event) {
        var target = event.target;
        var x = parseFloat(target.getAttribute("data-x")) || 0;
        var y = parseFloat(target.getAttribute("data-y")) || 0;

        // update the element's style
        target.style.width = event.rect.width + "px";
        target.style.height = event.rect.height + "px";

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        // target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      },
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: "parent",
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 },
      }),
    ],

    inertia: true,
  })
  .draggable({
    modifiers: [restrictToParent],
    inertia: true,
    listeners: {
      move(event) {
        position.x += event.dx;
        position.y += event.dy;
        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
    },
  });

function Canvas(props) {
  interact(".bgCanvas").resizable({
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
        setCanvasWidth(Math.floor(event.rect.width));
        setCanvasHeight(Math.floor(event.rect.height));
        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        // target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      },
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: "parent",
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 },
      }),
    ],

    inertia: true,
  });
  const [canvasWidth, setCanvasWidth] = useState(770);
  const [canvasHeight, setCanvasHeight] = useState(500);
  const {
    fontStyle,
    textColor,
    pictureText,
    canvasBackground,
    signSize,
    textAlignment,
    strokeLength,
    strokeColor,
  } = props;
  return (
    <Box
      sx={{
        width: canvasWidth + 'px',
        height: canvasHeight + 'px',
        minHeight: "400px",
        minWidth: "400px",
      }}
      className="bgCanvas"
    >
      <Typography textAlign={"center"} sx={{marginBottom:'5px'}}>Select corners to resize the canvas dynamically</Typography>

      <Typography
        className={`ghost neonText ${textAlignment} ${fontStyle} ${textColor} ${signSize}`}
        variant="span"
        sx={{
          position: "absolute",
          maxWidth: 317,
          WebkitTextStrokeColor: `${strokeColor}`,
          WebkitTextStrokeWidth: `${strokeLength}px`,
        }}
      >
        {pictureText}
      </Typography>
      <img width={"100%"} draggable="off" alt="Canvas" src={canvasBackground} />
      {/* </Paper> */}
      <Grid
      container
        spacing={2}

        sx={{ marginTop: "10px" }}
        justifyContent="center"
      >
        <Grid item xs={5}>

        <TextField
          label="px"
          type="number"
          value={canvasWidth}
          sx={{width:'100%'}}
          helperText="Canvas Width"
          onChange={(evt) => setCanvasWidth(evt.target.value)}
          inputProps={{ min: "300", max: "800" }}
        />
        </Grid>
        <Grid item xs={5}>
        <TextField
          label="px"
          type="number"
          helperText="Canvas Height"
          sx={{width:'100%'}}
          value={canvasHeight}
          onChange={(evt) => setCanvasHeight(evt.target.value)}
          inputProps={{ min: "300", max: "800" }}
        />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Canvas;
