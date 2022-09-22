import React, { useState, useRef } from "react";
import { TextField,  Button, Typography,Grid } from "@mui/material";
import { Stack, Box } from "@mui/system";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import NeonAccordion from "../NeonAccordion";
import AppBar from '../components/AppBar';
import Canvas from "../Canvas";

import "../App.css";

// const fontsOptions = [
//   "Lora-Italic",
//   "Marc-Script",
//   "Dancing-Script",
//   "Bad-Script",
// ];


const fontsOptions = [
  {
    title:'Lora-Italic',
    className:'Lora-Italic'
  },

  {
    title:'Marc-Script',
    className:'Marc-Script'
  },
  {
    title:'Dancing-Script',
    className:'Dancing-Script'
  },
  {
    title:'Bad-Script',
    className:'Bad-Script'
  },

];


const colorsOptions = [
  {
    title:'IceBlue',
    className:'IceBlue'
  },
  {
    title:'PurpleHaze',
    className:'PurpleHaze'
  },
  {
    title:'HotPink',
    className:'HotPink'
  },
  {
    title:'GreenLime',
    className:'GreenLime'
  },
];

const signSizeOptions = [
  {
    title:'Small',
    className:'text-20'
  },
  {
    title:'Medium',
    className:'text-30'
  },
  {
    title:'Large',
    className:'text-40'
  },
  {
    title:'Extra-Large',
    className:'text-45'
  },
]

function Home() {
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
    event.target.value = null;

    setCanvasBackground(URL.createObjectURL(fileObj));
  };

  const handleInputChange = (evt) => {
    const text = evt.target.value;
    setPictureText(text);
  };

  return (

    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: '100vh' }}
    >
      <AppBar />
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
            buttonContained
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
    </Grid>
  );
}

export default Home;