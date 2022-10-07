import { Typography, Box, TextField, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import interact from "interactjs";

// const maxWidth = "500pt";
// const maxheight = "360pt";

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

  const {
    fontStyle,
    textColor,
    pictureText,
    canvasBackground,
    textAlignment,
    strokeLength,
    strokeColor,
    contentRef,
    fontSize,
    selectedUnit,
    setSelectedUnit,
  dimension,
    // textSize,
    // setTextSize,
    previewImage,
    setFontSize = () => {}
  } = props;

  let divisionNumber = 2;

  useEffect(() => {

    setTextSize(dimension)

  },[dimension])

useEffect(() => {

interact(".ghost")
  .resizable({
    // resize from all edges and corners
    inertia: {
      resistance: 300,
      minSpeed: 900,
      endSpeed: 800
    },
    edges: { left: true, right: true, bottom: true, top: true},

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
        setFontSize(document.querySelector('.ghost').getBoundingClientRect().height/ divisionNumber );
        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        setTextSize({
          width:event.rect.width,
          height:event.rect.height,
        })

        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      },
    //  end(event) {
    //     var target = event.target;
    //     // target.style.width = 'auto';
    //     // target.style.height= 'auto';
    //     //     let computedFontSize = document.querySelector('.ghost').getBoundingClientRect().width / 2
    //     //     setFontSize(computedFontSize );
    //  }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: "parent",
      }),

      // interact.modifiers.aspectRatio({
      //   ratio:textSize.width / textSize.height
      // }),
      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 50, height: 50 },
        // max: { width: 200,height:200},
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
    //  end(event) {
    //   // event.target.style.height = 'auto'
    //   // event.target.style.transform = 'scale(1.8)';
    //         // let computedFontSize = document.querySelector('.ghost').getBoundingClientRect().width / 2
    //         // setFontSize(computedFontSize );
    //  }
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
          width:event.rect.width,
          height:event.rect.height,
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
            // max: { width: 500, height: 360 },
      }),
    ],

    inertia: true,
  });

}, []);

  const [canvasSize, setCanvasSize] = useState({
    width: 661,
    height: 484,
  });

  const [textSize, setTextSize] = useState({
    width: 350,
    height: 150,
  });

  // const [fontSize, setFontSize] = useState('');

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


      <Typography
        className={`ghost ${textAlignment} ${fontStyle} ${textColor} `}
        variant="span"
        ref={contentRef}
        sx={{
          width:textSize.width + 'pt',
          height:textSize.height + 'pt',
          maxHeight:`250px`,
          color:'white',
          position: "absolute",
          fontSize: fontSize,
          padding:'5px',
          WebkitTextStrokeColor: `${strokeColor}`,
          WebkitTextStrokeWidth: `${strokeLength}px`,
          border: "white dashed 1px",
        }}
      >
        
        {pictureText}
      </Typography>
      <img width={"100%"} draggable="off" alt="Canvas" src={canvasBackground} />
      <Typography textAlign={"center"} sx={{marginBottom:'5px'}}>Select corners to resize the canvas dynamically</Typography>
      <Grid
      container
        spacing={2}
        // direction="column"
        sx={{ marginTop: "10px" }}
        justifyContent="start"
        alignItems="center"
        gap={1}
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
            setSelectedUnit(e.target.value);
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
            setFontSize(document.querySelector('.ghost').clientHeight / divisionNumber );
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

            setFontSize(document.querySelector('.ghost').clientHeight / divisionNumber );
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
