import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { Stack, Box } from "@mui/system";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import NeonAccordion from "../NeonAccordion";
import AppBar from "../components/AppBar";
import Canvas from "../Canvas";
import "../App.css";
import { TwitterPicker } from "react-color";

const fontsOptions = [
  {
    title: "Lora-Italic",
    className: "Lora-Italic",
  },

  {
    title: "Marc-Script",
    className: "Marc-Script",
  },
  {
    title: "Dancing-Script",
    className: "Dancing-Script",
  },
  {
    title: "Bad-Script",
    className: "Bad-Script",
  },
];

const colorsOptions = [
  {
    title: "IceBlue",
    className: "IceBlue",
  },
  {
    title: "PurpleHaze",
    className: "PurpleHaze",
  },
  {
    title: "HotPink",
    className: "HotPink",
  },
  {
    title: "GreenLime",
    className: "GreenLime",
  },
];

const signSizeOptions = [
  {
    title: "Small",
    className: "text-20",
  },
  {
    title: "Medium",
    className: "text-30",
  },
  {
    title: "Large",
    className: "text-40",
  },
  {
    title: "Extra-Large",
    className: "text-45",
  },
];

function Home() {
  const [pictureText, setPictureText] = useState("Hello World");
  const [textAlign, setTextAlign] = useState("start");
  const [strokeColor, setStrokeColor] = useState("#4caf40");
  const [strokeLength, setStrokeLength] = useState(0);
  const [textColor, setTextColor] = useState(colorsOptions[0]);
  const [fontStyle, setFontStyle] = useState(fontsOptions[0]);
  const [signSize, setSignSize] = useState(signSizeOptions[0]);
  const [canvasBackground, setCanvasBackground] = useState(
    "https://images.unsplash.com/photo-1495578942200-c5f5d2137def?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2950&q=80"
  );
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
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
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <AppBar />
      <Box
        sx={{
          bgcolor: "secondary.main",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // marginTop: "150px",
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
            canvasBackground={canvasBackground}
            pictureText={pictureText}
            textAlignment={textAlign}
            strokeColor={strokeColor}
            strokeLength={strokeLength}
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
              helperText={`${27 - pictureText.length} Chracters Left.`}
              multiline
            />
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="subtitle1">
                Max Character Length is 27
              </Typography>
              {/* <Typography sx={{marginLeft:'5px'}} variant="subtitle1">
                Stroke Length is <b>{strokeLength}</b>px
              </Typography> */}
              <Box>
                <Button onClick={() => setTextAlign("start")}>
                  <FormatAlignLeftIcon />
                </Button>
                <Button onClick={() => setTextAlign("center")}>
                  <FormatAlignCenterIcon />
                </Button>
                <Button onClick={() => setTextAlign("end")}>
                  <FormatAlignRightIcon />
                </Button>
              </Box>
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography>Text Stroke</Typography>
              <TextField
                id="outlined-number"
                value={strokeLength}
                onChange={(evt) => setStrokeLength(evt.target.value)}
                label="px"
                type="number"
                inputProps={{
                  shrink: "true",
                  min: 0,
                  max: 20,
                }}
                sx={{ width: "80px", height: "50px" }}
              />
              {/* <ColorPicker defaultValue="red" hideTextfield/> */}
              {/* <ColorButton color="red" />
            <ColorPicker color="red" /> */}
              <TwitterPicker color={strokeColor}  triangle="hide" onChange={(color)=> setStrokeColor(color.hex)} />

              {/* <input type="number" min="0" max="20" />
            <label>PX</label> */}
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
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              onClick={() => inputRef.current.click()}
              color="info"
            >
              Change Background <OpenInNewIcon />
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Grid>
  );
}

export default Home;
