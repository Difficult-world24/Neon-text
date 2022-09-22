import React from 'react';
import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import useStyles from './style';

const Button = ({
  children,
  className,
  dataTarget = '',
  loading = false,
  disabled,
  disableLoader = true,
  ...restProps
}) => {
  const classes = useStyles();
  const isDisabled = disabled || loading;

  return (
    <MuiButton
      className={`${classes.mainButton} ${className}`}
      variant='contained'
      classes={{
        label: classes.mainButtonLabel,
      }}
      color='primary'
      {...restProps}
      disabled={isDisabled}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
