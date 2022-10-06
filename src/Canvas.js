import { Typography, Box, TextField, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import interact from "interactjs";
var ReactFitText = require('react-fittext');

const maxWidth = "500pt";
const maxheight = "360pt";

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

  return Math.floor(size) || 1;
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

const restrictToParent = interact.modifiers.restrictRect({
  restriction: "parent",
});

const position = { x: 0, y: 0 };


function Canvas(props) {

useEffect(() => {

interact(".ghost")
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      start(event){
        // var target = event.target;
        // target.style.width = 'auto';
        // target.style.height= 'auto';
      },
      move(event) {
        var target = event.target;
        var x = parseFloat(target.getAttribute("data-x")) || 0;
        var y = parseFloat(target.getAttribute("data-y")) || 0;

        // update the element's style
        target.style.width = event.rect.width ;
        target.style.height = event.rect.height ;
        setFontSize(document.querySelector('.ghost').getBoundingClientRect().height/ 2 );
        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        // target.style.transform = 'translate(' + x + 'px,' + y + 'px)'
        setTextSize({
          width:event.rect.width,
          height:event.rect.height,
        })

        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      },
     end(event) {
        var target = event.target;
        // target.style.width = 'auto';
        // target.style.height= 'auto';
        //     let computedFontSize = document.querySelector('.ghost').getBoundingClientRect().width / 2
        //     setFontSize(computedFontSize );
     }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: "parent",
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 50, height: 50 },
        // max: { width: 420 },
      }),
    ],

    // inertia: true,
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
     end(event) {
      // event.target.style.height = 'auto'
      // event.target.style.transform = 'scale(1.8)';
            // let computedFontSize = document.querySelector('.ghost').getBoundingClientRect().width / 2
            // setFontSize(computedFontSize );
     }
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
        // target.style.width = event.rect.width + "px";
        // target.style.height = event.rect.height + "px";
        // setCanvasWidth(Math.floor(event.rect.width));
        // setCanvasHeight(Math.floor(event.rect.height));
        setCanvasSize({
          width:Math.floor(event.rect.width),
          height:Math.floor(event.rect.height),
        })
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
            max: { width: 500, height: 360 },
      }),
    ],

    inertia: true,
  });

}, []);
  const [selectedUnit, setSlectedUnit] = useState("mm");
  const [canvasSize, setCanvasSize] = useState({
    width: "480",
    height: "360",
  });

  const [textSize, setTextSize] = useState({
    width: "249",
    height: "80",
  });

  const [fontSize, setFontSize] = useState(80 / 2 + 'pt');

  const {
    fontStyle,
    textColor,
    pictureText,
    canvasBackground,
    signSize,
    textAlignment,
    strokeLength,
    strokeColor,
    contentRef,
    previewImage
  } = props;
  return (
    <Box
      sx={{
        width: canvasSize.width + 'pt',
        height: canvasSize.height + 'pt',
        minHeight: "400px",
        minWidth: "400px",
      }}
      className="bgCanvas"
    >

      {/* <ReactFitText> */}
        {/* <ScaleText> */}

      <Typography
        className={`ghost ${textAlignment} ${fontStyle} ${textColor} `}
        variant="span"
        ref={contentRef}
        sx={{
          width:textSize.width + 'pt',
          height:textSize.height + 'pt',
          // top:position.x,
          // left:position.y,
          color:'white',
          // lineHeight:1,
          position: "absolute",
          fontSize: fontSize,
          padding:'5px',
          WebkitTextStrokeColor: `${strokeColor}`,
          WebkitTextStrokeWidth: `${strokeLength}px`,
          border: "white dashed 1px",
        }}
      >
        
        {/* <svg xmlns="http://www.w3.org/2000/svg" style={{width:`${textSize.width}pt`,  height:`${textSize.height}pt`}} viewBox="18.219999313354492 0 49.55999755859375 86"><path stroke="black" fill="red" d="M18.22 86L18.22 0L24.78 0L24.78 86L18.22 86ZM61.22 86L61.22 0L67.78 0L67.78 86L61.22 86Z"></path></svg> */}
        {/* <span> */}
        {pictureText}
        {/* </span> */}
      </Typography>
      <img width={"100%"} draggable="off" alt="Canvas" src={canvasBackground} />
      {/* </Paper> */}
      <Typography textAlign={"center"} sx={{marginBottom:'5px'}}>Select corners to resize the canvas dynamically</Typography>
      <Grid
      container
        spacing={2}
        // direction="column"
        sx={{ marginTop: "10px" }}
        justifyContent="start"
      >
        <Grid item xs={5}>

        <TextField
          label={selectedUnit}
          type="number"
          sx={{width:'100%'}}
          helperText="Canvas Width"
          value={convertPointToUnits(canvasSize.width, selectedUnit)}
          onChange={(e) => {
            setCanvasSize((o) => ({
              ...o,
              width: convertUnitToPoint(e.target.value, selectedUnit),
            }));
          }}
        />
        </Grid>
        <Grid item xs={5}>
        <TextField
          label={selectedUnit}
          type="number"
          helperText="Canvas Height"
          sx={{width:'100%'}}

          value={convertPointToUnits(canvasSize.height, selectedUnit)}
          onChange={(e) => {
            setCanvasSize((o) => ({
              ...o,
              height: convertUnitToPoint(e.target.value, selectedUnit),
            }));
          }}
        />
        </Grid>
        {/* <Grid item xs={2}>
        {previewImage}
        </Grid> */}
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
      </Grid>
      {/* Text */}
      <Grid
      container
        spacing={2}
        // direction="column"
        sx={{ marginTop: "10px" }}
        justifyContent="start"
      >
        <Grid item xs={5}>

        <TextField
          label={selectedUnit}
          type="number"
          sx={{width:'100%'}}
          helperText="Text Width"
          value={convertPointToUnits(textSize.width, selectedUnit)}
          onChange={(e) => {

            setTextSize((o) => ({
              ...o,
              width: convertUnitToPoint(e.target.value, selectedUnit),
            }));
          }}
        />
        </Grid>
        <Grid item xs={5}>
        <TextField
          label={selectedUnit}
          type="number"
          helperText="Text Height"
          sx={{width:'100%'}}
          value={convertPointToUnits(textSize.height, selectedUnit)}
          onChange={(e) => {
            // let computedFontSize = document.querySelector('.ghost').getBoundingClientRect().width / 2
            // setFontSize(computedFontSize );

        setFontSize(document.querySelector('.ghost').getBoundingClientRect().height/ 2 );
            setTextSize((o) => ({
              ...o,
              height: convertUnitToPoint(e.target.value, selectedUnit),
            }));
          }}
        />
        </Grid>
        <Grid item sx={{width:'200px'}}>
        {previewImage}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Canvas;
