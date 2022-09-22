import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(({ custom }) => ({
  mainButton: {
    // paddingTop: 4,
    // paddingBottom: 4,
    boxShadow: 'unset',
    fontSize: '15px',
    backgroundColor: '#1E88E5',
    color: '#ffffff',
    '&:hover': {
      boxShadow:
        '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      backgroundColor: '#1e88e5',
      // backgroundColor: '#1976d2',
    },
    '&:focus': {
      outline: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&.Mui-disabled': {
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.12) !important',
    },
  },
  mainButtonLabel: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
  mainOutlinedButton: {
    // lineHeight: 1.8,
    padding: '5px 15px',
    boxShadow: 'unset',
    border: `1px solid '#1e88e5`,
    color: '#1e88e5',
    backgroundColor: 'transparent',
    '&:hover': {
      boxShadow: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&.Mui-disabled': {
      border: 'none',
    },
  },
  iconButton: {
    '&:hover': {
      boxShadow: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&.Mui-disabled': {
      border: 'none',
    },
  },
  mainOutlinedButtonLabel: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
}));

export default useStyles;
