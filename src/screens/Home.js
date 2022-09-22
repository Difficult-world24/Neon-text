import React, { useState } from 'react';
import { Button, TextField, Typography, Grid } from '@mui/material';
import { Stack, Box } from '@mui/system';
import interact from 'interactjs';
import '../App.css';
import AppBar from '../components/AppBar';

function Home() {
  const [pictureText, setPictureText] = useState('Hello World');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleInputChange = (evt) => {
    const text = evt.target.value;
    setPictureText(text);
  };

  const restrictToParent = interact.modifiers.restrictRect({
    restriction: 'parent',
  });

  interact('.ghost').draggable({
    modifiers: [restrictToParent],
    listeners: {
      move(event) {
        position.x += event.dx;
        position.y += event.dy;

        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
      end(event) {
        console.log(event.dx);
        console.log(event.dy);
      },
    },
  });

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
          bgcolor: 'info.main',
          marginTop: 2,
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
          <Box
            sx={{
              width: 500,
              height: 281,
            }}
          >
            <Typography
              className='ghost neonText'
              variant='h4'
              sx={{
                position: 'absolute',
              }}
            >
              {pictureText}
            </Typography>
            <img
              width={'100%'}
              alt='PlaceHolder'
              src='https://wallpapercave.com/wp/wp6852847.jpg'
            />
          </Box>
          <Stack direction='column' spacing={2}>
            <TextField
              id='standard-basic'
              onChange={handleInputChange}
              name='text'
              label='Text For Picture'
              variant='outlined'
            />
          </Stack>
        </Stack>
      </Box>
    </Grid>
  );
}

export default Home;
