import { Paper, Typography, Box } from "@mui/material";
import React from "react";
import interact from "interactjs";
import { TurnedIn } from "@mui/icons-material";

const restrictToParent = interact.modifiers.restrictRect({
  restriction: "parent",
  //   elementRect:{

  //   top:5,
  //   left:5,
  //   bottom:5,
  //   right:5
  //   }
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

interact(".bgCanvas").resizable({
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
});

function Canvas(props) {
  const {
    fontStyle,
    textColor,
    pictureText,
    canvasBackground,
    signSize,
    textAlignment,
    resolution: { width, height },
  } = props;
  return (
    <Box
      sx={{
        width,
        height,
      }}
      className="bgCanvas"
    >
      {/* <Paper elevation={7}> */}

      <Typography
        className={`ghost neonText ${textAlignment} ${fontStyle} ${textColor} ${signSize}`}
        variant="span"
        sx={{
          position: "absolute",
          border: "1px dashed white",
        }}
      >
        {pictureText}
      </Typography>
      <img width={"100%"} draggable="off" alt="Canvas" src={canvasBackground} />
      {/* </Paper> */}
    </Box>
  );
}

export default Canvas;
