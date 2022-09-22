import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Box, Grid, Typography, InputAdornment } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import Button from '../components/Button';
import { MainContext } from '../contexts/AuthContext';
import { setItem } from '../helper/storageHelper';

// styling for this component
const useStyles = makeStyles(({ custom }) => ({
  formWrapper: {},
  formInputFiled: {
    marginTop: 5,
    marginBottom: 8,
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 15px) scale(1)',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
    paddingBottom: '10px !important',
  },
  formSubmitButtonWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  formSubmitButton: {
    '&:hover': {
      border: `none`,
    },
    '&:focus': {
      outline: `none`,
    },
  },
  forgotPassword: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '143%',
    marginTop: 6,
    color: '#1976D2',
    textDecoration: 'underline #a3c8ed',
  },
  errorMessage: {
    color: 'red',
    fontSize: '0.75rem',
    marginTop: 5,
    marginBottom: 15,
    textAlign: 'left',
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  publicBackgroundWrapper: {},
}));

/**
 * login component
 * @returns {*}
 * @constructor
 */
const Login = () => {
  const classes = useStyles();
  const [disableLoginBtn, setDisableLoginBtn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const formRef = useRef();

  const { email, password } = formData;

  const { setJwt } = useContext(MainContext);
  const navigate = useNavigate();

  // handle input value change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle the change of the loading state
  useEffect(() => {
    // disable enable button as per loading
    if (disableLoginBtn) {
      setDisableLoginBtn(false);
    }
  }, [disableLoginBtn]);

  /**
   * handle submit and do login or show error
   */
  const onSubmit = (e) => {
    e.preventDefault();
    setDisableLoginBtn(true);
    if (email == 'test@mail.com' && password == '1234') {
      setTimeout(() => {
        const authToken =
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZmNmNTA3ZmMyNWEyYzZiY2IxZDVlMGM5ZDViNTIzZjc2NzA1OWE3MmQxNDZiMDRmYmFhMGU4MzZjYmU1MjY0OTRiMmMwNDY1ZWJlMmQ5NTAiLCJpYXQiOjE2NjM3NTM4MjksIm5iZiI6MTY2Mzc1MzgyOSwiZXhwIjoxNjk1Mjg5ODI5LCJzdWIiOiI1NzIwNjAiLCJzY29wZXMiOltdfQ.a_5B6TSxRKYEC-N_QKJ7h-Bew2ASbotnNfYgp64SRg8MG1q4JJuCIV5n4AhIjOogTcaP4VJmsZi-j-rzaiGrhAyETMcSAgHRIMf5xk_NPNWC-6IIW9JQmvFbIcYswkwHJltorHkh8PhCMi_gAQYRscmzX7Y16OpOb6HAiZ8xNZQDOkrCeU78TgSAcq9sJZL80OFdtevKSkez5NWsO82bRwWYyI5mEjBLbSonTvifqcR_wmQ0DytjAKAEd3STTBTGzXOAMHPhdZcnwgL_Gz6Q7N3p8gOU759GHNTrmVGkdk_dTk4szVsDB2bq395heZjsBApcOzLbGncbmmPMfBRWoHri8D0mU7DP4QL434GHakNQwURmdOXOkxGeutzrtCVxQB3rh9549CPaKuN1tNTtUr3hwdYnbewvDTUJ-rr7uroW5QpsmExTLz92m0WaJZwkrrMernjhmBiVBhgyb4fh5Jadu65K7Lb0gCS5SDO9y-6YnRDF-oMzTSlw6LSbpTbOvIZixJXFGcDTlymW-gkNdV9Ao4QHbWl0pga12NOfQNzE6Kax5ntrKZ5MVWdA6bqqJ8XOw_SF0kj5C3JxZhwca3f58W4leKMK5v8FxtaUn1UgaN47PjqqMZ6PxTTmz-SfXI2ffomYQ5JFg-hJpTpNojiwgIZDXlmaOgNP1zbM0YU';
        setJwt(authToken);
        setItem('token', authToken);
        navigate('/home');
      }, 1000);
    } else {
      setErrorMessage(
        'The email address or password you entered is incorrect!'
      );
    }
    setDisableLoginBtn(false);
  };

  /**
   * Return function to render UI elements
   */
  return (
    <Fragment>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justify='center'
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <Box width={1} height={1}>
            <div className='public-background-wrapper'>
              <div className='login-wrapper'>
                <div className='login-container'>
                  <div className='loging-right-section'>
                    <ValidatorForm
                      onSubmit={onSubmit}
                      ref={(r) => (formRef.current = r)}
                    >
                      <Box mb={2} display='flex'>
                        <div className='heading'>
                          <Box mb={4}>
                            {/* <img src={images.app.logo} width="240" /> */}
                          </Box>
                          <Typography variant='h3'>Login</Typography>
                        </div>
                      </Box>
                      <div className={classes.formWrapper}>
                        <Grid container>
                          <Grid item xs={12} sm={12}>
                            <Grid item xs={12} sm={12}>
                              <TextValidator
                                placeholder='Email'
                                className={classes.formInputFiled}
                                onChange={handleChange}
                                name='email'
                                value={email}
                                fullWidth
                                variant='outlined'
                                validators={['required', 'isEmail']}
                                errorMessages={[
                                  'Email is required',
                                  'Invalid email address',
                                ]}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position='start'>
                                      <MailIcon style={{ fill: '#d1d1d1' }} />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sm={12}>
                            <TextValidator
                              placeholder='Password'
                              className={classes.formInputFiled}
                              onChange={handleChange}
                              name='password'
                              type='password'
                              value={password}
                              fullWidth
                              variant='outlined'
                              validators={['required']}
                              errorMessages={['Password is required']}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    <LockIcon style={{ fill: '#d1d1d1' }} />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                      </div>
                      <div className={classes.formSubmitButtonWrapper}>
                        {errorMessage !== '' && (
                          <p className={classes.errorMessage}>{errorMessage}</p>
                        )}
                        <Button
                          variant='contained'
                          disabled={disableLoginBtn}
                          className={classes.formSubmitButton}
                          type='submit'
                          fullWidth
                          loading={false}
                        >
                          Login
                        </Button>
                      </div>
                      <Box display='flex' justifyContent='space-between'>
                        <Link
                          //   to={`/password-forgot`}
                          className={classes.forgotPassword}
                        >
                          Forget Password
                        </Link>
                        <a
                          //   href={}
                          className={classes.forgotPassword}
                          target='_blank'
                        >
                          Don't have an account
                        </a>
                      </Box>
                    </ValidatorForm>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Login;
