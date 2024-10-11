import { useState, Fragment, ChangeEvent, MouseEvent, ReactNode, FormEvent } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import Google from 'mdi-material-ui/Google'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import Image from 'next/image'
import Alert from '@mui/material/Alert'
// import OtpVerification from '../otpVerification'
import OTPInput from '../OTP'
import { FormHelperText } from '@mui/material'

interface State {
  password: string
  confirmPassword: string
  showPassword: boolean
}

const GooglePath = '/images/logos/google.png'

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {
  const [values, setValues] = useState<State>({
    password: '',
    confirmPassword: '',
    showPassword: false
  })
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    checkbox: '',
    username: ''
  })
  const [checkbox, setCheckbox] = useState(false)
  const [isOTPSent, setIsOTPSent] = useState(false) // State to track OTP sent status
  const [otp, setOtp] = useState('') // State for storing OTP

  const validateForm = () => {
    let isValid = true
    const newError = { email: '', password: '', confirmPassword: '', checkbox: '', username: '' }

    if (!username) {
      newError.username = 'Username is required'
      isValid = false
    }

    if (!email) {
      newError.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = 'Email address is invalid'
      isValid = false
    }

    if (!values.password) {
      newError.password = 'Password is required'
      isValid = false
    }

    if (values.password !== values.confirmPassword) {
      newError.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    if (!checkbox) {
      newError.checkbox =
        'You must agree to the terms and conditions to proceed. Your understanding helps us provide you with a better experience!'
      isValid = false
    }

    setError(newError)
    return isValid
  }

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleCheckboxChange = () => {
    setCheckbox(!checkbox)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Log the form data (this is where you would handle the form submission logic)
      console.log('Form Data:', { username, email, password: values.password })

      // Send OTP logic goes here (you can replace this with an API call)
      // Example: await sendOtp(email)

      setIsOTPSent(true) // Set OTP sent state
      setUsername('')
      setEmail('')
      setValues({
        password: '',
        confirmPassword: '',
        showPassword: false
      })
      setCheckbox(false)
    } else {
      console.log('Form validation failed')
    }
  }

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // Handle OTP submission logic
    console.log('OTP Submitted:', otp)
    // Here you can validate the OTP and take further actions
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(10, 9, 7)} !important` }}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative', width: '500px', height: '40px' }}>
              <Image src='/images/logos/logo.png' alt='Logo' layout='fill' objectFit='contain' />
            </Box>
          </Box>
          <Box sx={{ mb: { xs: 4, sm: 6 } }}>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 600,
                marginBottom: { xs: 1, sm: 1.5 }, // Responsive marginBottom
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: { xs: 'center', sm: 'center' }, // Center alignment for all screens
                fontSize: { xs: '1rem', sm: '.2rem', md: '1.4rem' } // Responsive font sizes
              }}
            >
              #oneclicktoconnect 🚀
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={isOTPSent ? handleOtpSubmit : handleSubmit}>
            {!isOTPSent ? (
              <>
                <TextField
                  autoFocus
                  fullWidth
                  id='username'
                  label='Username'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  error={!!error.username}
                  helperText={error.username}
                  sx={{ marginBottom: 4 }}
                />

                <TextField
                  fullWidth
                  type='email'
                  label='Email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  error={!!error.email}
                  helperText={error.email}
                  sx={{ marginBottom: 4 }}
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
                  <OutlinedInput
                    label='Password'
                    value={values.password}
                    id='auth-register-password'
                    onChange={handleChange('password')}
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                        </IconButton>
                      </InputAdornment>
                    }
                    error={!!error.password}
                  />
                </FormControl>
                <Typography color='error' variant='caption'>
                  {error.password}
                </Typography>
                <FormControl fullWidth sx={{ marginTop: 4 }}>
                  <InputLabel htmlFor='auth-register-confirm-password'>Confirm Password</InputLabel>
                  <OutlinedInput
                    label='Confirm Password'
                    value={values.confirmPassword}
                    id='auth-register-confirm-password'
                    onChange={handleChange('confirmPassword')}
                    type={values.showPassword ? 'text' : 'password'}
                    error={!!error.confirmPassword}
                  />
                </FormControl>
                <Typography color='error' variant='caption'>
                  {error.confirmPassword}
                </Typography>
                <FormControlLabel
                  control={<Checkbox checked={checkbox} onChange={handleCheckboxChange} />}
                  label={
                    <Fragment>
                      <Typography
                        variant='body2'
                        sx={{ display: 'inline', fontSize: { xs: '14px', sm: '.2rem', md: '14px' } }}
                      >
                        I agree to
                      </Typography>
                      <Link href='/' passHref>
                        <LinkStyled onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                          <Typography
                            variant='body2'
                            sx={{
                              marginLeft: 1,
                              display: 'inline',
                              textDecoration: 'underline',
                              fontSize: { xs: '14px', sm: '.2rem', md: '14px' }
                            }}
                          >
                            LinktoSync’s User Agreement, Privacy Policy, and Cookie Policy.
                          </Typography>
                        </LinkStyled>
                      </Link>
                    </Fragment>
                  }
                />
                {/* Display the alert conditionally */}
                {error.checkbox && (
                  <Alert severity='error' sx={{ marginBottom: 2 }}>
                    {error.checkbox}
                  </Alert>
                )}
                <Button fullWidth type='submit' size='large' variant='contained' sx={{ marginTop: 2 }}>
                  Register
                </Button>
                <Divider sx={{ my: 4 }}>or</Divider>
                {/* <Button fullWidth size='large' variant='outlined' sx={{ marginBottom: 7 }} startIcon={<Google />}>
                  Sign up with Google
                </Button> */}
                <Button fullWidth size='large' variant='outlined' sx={{ marginBottom: 7 }}>
                  <IconButton component='a'>
                    <Box sx={{ width: '20px', height: '20px', position: 'relative' }}>
                      <Image src={GooglePath} alt='Google Logo' layout='fill' objectFit='contain' />
                    </Box>
                  </IconButton>
                  <Box sx={{}}>
                    <Typography variant='body1'>Google</Typography>
                  </Box>
                </Button>
                <Typography variant='body2' sx={{ textAlign: 'center' }}>
                  Already have an account?{' '}
                  <Link href='/pages/auth/login' passHref>
                    <LinkStyled>Login</LinkStyled>
                  </Link>
                </Typography>
              </>
            ) : (
              <OTPInput
                separator={<span>-</span>}
                otp={otp}
                setOtp={setOtp}
                length={6}
                handleSubmit={handleOtpSubmit}
              />
            )}
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
