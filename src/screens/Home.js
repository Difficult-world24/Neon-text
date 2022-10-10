import React, { useState, useRef, useEffect } from 'react'
import { TextField, Button, Typography, Grid } from '@mui/material'
import { Stack, Box } from '@mui/system'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import NeonAccordion from '../NeonAccordion'
import AppBar from '../components/AppBar'
import Canvas from '../Canvas'
import '../App.css'
import { TwitterPicker } from 'react-color'
import { useScreenshot } from 'use-react-screenshot'
// import { useScreenshot } from "use-screenshot-hook";

const fontsOptions = [
  {
    title: 'Lora-Italic',
    className: 'Lora-Italic',
  },

  {
    title: 'Dancing-Script',
    className: 'Dancing-Script',
  },
  {
    title: 'Bad-Script',
    className: 'Bad-Script',
  },
]

export const colorsOptions = [
  {
    title: 'IceBlue',
    className: 'IceBlue',
  },
  {
    title: 'PurpleHaze',
    className: 'PurpleHaze',
  },
  {
    title: 'HotPink',
    className: 'HotPink',
  },
  {
    title: 'GreenLime',
    className: 'GreenLime',
  },
]

const signSizeOptions = [
  {
    title: 'Small',
    className: 'text-20',
    fontSize: 49,
  },

  // {
  //   title: "Small",
  //   className: "text-20",
  //   fontSize:{
  //     size:49,
  //     dimension:{
  //     width:50,
  //     height:70,
  //     }
  //   },
  // },
  {
    title: 'Medium',
    className: 'text-30',
    fontSize: 59,
  },
  {
    title: 'Large',
    className: 'text-40',
    fontSize: 70,
  },
  {
    title: 'Extra-Large',
    className: 'text-45',
    fontSize: 84,
  },
]

function Home() {
  const [pictureText, setPictureText] = useState('Zasya')
  const [textAlign, setTextAlign] = useState('center')
  const [strokeColor, setStrokeColor] = useState('#4caf40')
  const [strokeLength, setStrokeLength] = useState(0)
  const [textColor, setTextColor] = useState(colorsOptions[0].className)
  const [fontStyle, setFontStyle] = useState(fontsOptions[0].className)
  const [signSize, setSignSize] = useState(signSizeOptions[0].fontSize)
  const [charData, setCharsData] = useState([])
  const [dimension, setDimensions] = useState({ width: '100%', height: '100%' })
  const [previewSrc, setPreview] = useState('')
  const [selectedUnit, setSelectedUnit] = useState('mm')
  const [canvasBackground, setCanvasBackground] = useState('/wall.jpeg')
  const [image, takeScreenshot] = useScreenshot()

  useEffect(() => {
    takeScreenshot(ref.current)
  }, [textAlign, textColor, fontStyle, dimension])

  const getImage = () => {
    const element = ref.current
    // const element = ref.current.cloneNode(true)
    console.log('signSize', signSize)
    element.style.color = '#000'
    element.classList.remove(textColor)
    element.style.letterSpacing = `${signSize}px`
    element.style.webkitTextStrokeWidth = '0px'
    element.style.width = 'max-content'
    function getBase64(orignal) {
      return `data:image/png;base64,${orignal
        .replace("b'", '')
        .replace("'", '')}`
    }
    takeScreenshot(element).then((base64) => {
      element.style.color = '#fff'
      element.classList.add(textColor)
      element.style.letterSpacing = ''
      element.style.webkitTextStrokeWidth = `${strokeLength}px`
      element.style.width = 'initial'

      sendImageToServer(base64)
        .then(async (res) => {
          let response = await res.json()

          const mapped = Object.keys(response)
            .map((i) => {
              const item = response[i]
              return {
                ...item,
                img: getBase64(item.img),
              }
            })
            .filter((i) => i.stats)

          setCharsData(mapped)
          setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight)
          }, 200)

          // setPreview(computedImageUrl)
        })
        .catch((err) => console.error(err))
    })
  }

  async function sendImageToServer(Base64Url) {
    const response = await fetch(
      `http://127.0.0.1:5001/?unit=${selectedUnit}`,
      {
        method: 'POST',
        body: JSON.stringify({ neonText: Base64Url }),
      }
    )
    return response
  }
  const inputRef = useRef(null)
  const ref = useRef()

  function handleFileChange(event) {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }
    event.target.value = null

    setCanvasBackground(URL.createObjectURL(fileObj))
  }

  function handleInputChange(evt) {
    const text = evt.target.value
    setPictureText(text)
  }

  function signSizeCallBack(value) {
    setSignSize(value)
    setDimensions({ width: '100%', height: '100%' })
  }

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='space-between'
      style={{ minHeight: '100vh', paddingTop: '8rem' }}
    >
      <AppBar />
      <Box
        sx={{
          bgcolor: 'secondary.main',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // marginTop: "150px",
        }}
      >
        <Stack
          sx={{
            direction: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          direction='row'
          spacing={2}
        >
          <Canvas
            contentRef={ref}
            fontStyle={fontStyle}
            textColor={textColor}
            canvasBackground={canvasBackground}
            pictureText={pictureText}
            textAlignment={textAlign}
            fontSize={signSize}
            dimension={dimension}
            setFontSize={setSignSize}
            strokeColor={strokeColor}
            strokeLength={strokeLength}
            setSelectedUnit={setSelectedUnit}
            selectedUnit={selectedUnit}
            previewImage={
              <img
                src={previewSrc}
                width='880'
                alt='Neon Text With Bounding Box'
              />
            }
            charData={charData}
          />
          <Stack direction='column' sx={{ width: '17.4rem' }} spacing={2}>
            {/* Picture Text */}
            <TextField
              id='standard-basic'
              onChange={handleInputChange}
              name='text'
              value={pictureText}
              label='Text'
              inputProps={{ maxLength: 27 }}
              variant='outlined'
              helperText={`${27 - pictureText.length} Chracters Left.`}
              multiline
            />
            <Stack
              direction={'column'}
              alignItems={'start'}
              justifyContent={'space-between'}
            >
              <Typography variant='subtitle1'>
                Max Character Length is 13
              </Typography>
              <Box>
                <Button onClick={() => setTextAlign('start')}>
                  <FormatAlignLeftIcon />
                </Button>
                <Button onClick={() => setTextAlign('center')}>
                  <FormatAlignCenterIcon />
                </Button>
                <Button onClick={() => setTextAlign('end')}>
                  <FormatAlignRightIcon />
                </Button>
              </Box>
            </Stack>

            <Stack
              direction={'column'}
              alignItems={'start'}
              justifyContent={'space-between'}
            >
              <Typography marginBottom={1}>Text Stroke</Typography>
              <TextField
                id='outlined-number'
                value={strokeLength}
                onChange={(evt) => setStrokeLength(evt.target.value)}
                label='px'
                type='number'
                inputProps={{
                  shrink: 'true',
                  min: 0,
                  max: 20,
                }}
                sx={{ width: '80px', height: '50px', marginBottom: '20px' }}
              />
              <TwitterPicker
                color={strokeColor}
                triangle='hide'
                onChange={(color) => setStrokeColor(color.hex)}
              />
            </Stack>
            {/* Other Options */}
            <NeonAccordion
              options={colorsOptions}
              optionToggle={setTextColor}
              accordionTitle='Color'
              changeButton
            />
            <NeonAccordion
              options={fontsOptions}
              optionToggle={setFontStyle}
              accordionTitle='Style'
              changeButton
            />

            <NeonAccordion
              options={signSizeOptions}
              optionToggle={signSizeCallBack}
              accordionTitle='Size'
              buttonContained
              useKey='fontSize'
            />

            {/* <NeonAccordion
            options={['40%','80%']}
            optionToggle={setFontStyle}
            accordionTitle="Sign Size"
          /> */}

            <input
              style={{ display: 'none' }}
              ref={inputRef}
              type='file'
              onChange={handleFileChange}
            />
            <Button
              variant='contained'
              onClick={() => inputRef.current.click()}
              color='info'
            >
              Change Background <OpenInNewIcon />
            </Button>
            <Button variant='contained' onClick={getImage} color='info'>
              Letters Dimensions
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Grid>
  )
}

export default Home
