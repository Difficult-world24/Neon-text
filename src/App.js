import React, { useState, useRef } from "react";
import { TextField,  Button, Typography } from "@mui/material";
import { Stack, Box } from "@mui/system";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import NeonAccordion from "./NeonAccordion";

import Canvas from "./Canvas";

import "./App.css";

const fontsOptions = [
  "Lora-Italic",
  "Marc-Script",
  "Dancing-Script",
  "Bad-Script",
];
const colorsOptions = ["IceBlue", "PurpleHaze", "HotPink", "GreenLime"];
const signSizeOptions = ['small','medium','large']

function App() {
  const [pictureText, setPictureText] = useState("Hello World");
  const [textAlign, setTextAlign] = useState("start");
  const [textColor, setTextColor] = useState(colorsOptions[0]);
  const [fontStyle, setFontStyle] = useState(fontsOptions[0]);
  const [signSize, setSignSize] = useState(signSizeOptions[0]);
  const [canvasBackground, setCanvasBackground] = useState(
    "https://wallpapercave.com/wp/wp6852847.jpg"
  );

  const inputRef = useRef(null);


  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log('fileObj is', fileObj);

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    setCanvasBackground(URL.createObjectURL(fileObj));
    // setCanvasBackground(fileObj)
    console.log(fileObj.name);
  };

  const handleInputChange = (evt) => {
    const text = evt.target.value;
    setPictureText(text);
  };

  // const handleFontChange = (evt, selectedOption) => {
  //   setFontStyle(selectedOption);
  // };

  // const handleColorChange = (evt, selectedOption) => {
  //   setTextColor(selectedOption);
  // };

  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          direction: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        direction="row"
        spacing={2}
      >
        <Canvas
          fontStyle={fontStyle}
          textColor={textColor}
          signSize={signSize}
          resolution={{width:800}}
          canvasBackground={canvasBackground}
          pictureText={pictureText}
          textAlignment={textAlign}
        />
        <Stack direction="column" spacing={2}>
          {/* Picture Text */}
          <TextField
            id="standard-basic"
            onChange={handleInputChange}
            name="text"
            value={pictureText}
            label="Text"
            inputProps={{ maxLength: 27 }}
            variant="outlined"
            multiline
            // helperText={`Max Character Length is 27.`}
          />
          <Stack direction={"row"} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="subtitle1" >Max Character Length is 27</Typography>
          <Box>
          <Button onClick={()=> setTextAlign('start')}>
            <FormatAlignLeftIcon/>
          </Button>
          <Button onClick={()=> setTextAlign('center')} >
            <FormatAlignCenterIcon/>
          </Button>
          <Button onClick={()=> setTextAlign('end')} >
            <FormatAlignRightIcon/>
          </Button>
          </Box>
          </Stack>
          {/* Other Options */}
          <NeonAccordion
            options={colorsOptions}
            optionToggle={setTextColor}
            accordionTitle="Color"
            changeButton
          />
          <NeonAccordion
            options={fontsOptions}
            optionToggle={setFontStyle}
            accordionTitle="Style"
            changeButton
          />

          <NeonAccordion
            options={signSizeOptions}
            optionToggle={setSignSize}
            accordionTitle="Size"
          />

          {/* <NeonAccordion
            options={['40%','80%']}
            optionToggle={setFontStyle}
            accordionTitle="Sign Size"
          /> */}

          <input
        style={{display: 'none'}}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />
          <Button variant="contained" onClick={()=> inputRef.current.click()} color="info">
            Change Background <OpenInNewIcon />

          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default App;
