import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { MainContext } from '../../contexts/AuthContext';
import { removeItem } from '../../helper/storageHelper';
import { Box } from '@mui/material';
const NavBar = () => {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const { setJwt } = useContext(MainContext);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setTimeout(() => {
      setJwt('');
      removeItem('token');
      navigate('/login');
    }, 1000);
  };

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
        >
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          <Box   >
            <img alt='Brand' style={{ width: '60px', height: '51px' }} src={"https://cdn-fmclc.nitrocdn.com/uMyyDaTeGmjluEknOujUvYWGFMpSwciQ/assets/static/optimized/rev-725d393/wp-content/themes/indy-sign-factory/img/logo.png"} width="240" />
          </Box>
        </Typography>
        {auth && (
          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
