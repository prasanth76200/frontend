import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import { EyeOutline, EyeOffOutline } from 'mdi-material-ui'
import Image from 'next/image'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import ForgotPassword from '../forgotPassword/ForgotPassword'

interface State {
  username: string
  password: string
  showPassword: boolean
}

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const LoginPage = () => {
  const [values, setValues] = useState<State>({
    username: '',
    password: '',
    showPassword: false
  })
  const [errors, setErrors] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('') // State for login error message
  const router = useRouter()
  const theme = useTheme()
  const GooglePath = '/images/logos/google.png'
  const logoPath = '/images/logos/logo.png'

  const validateForm = () => {
    let valid = true
    let newErrors = { username: '', password: '' }

    if (values.username.trim() === '') {
      newErrors.username = 'Username is required'
      valid = false
    }
    if (values.password.trim() === '') {
      newErrors.password = 'Password is required'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      // Simulating an API call for login
      const response = await fakeLoginApi(values.username, values.password) // Replace with actual API call
      if (response.success) {
        // Proceed with login
        router.push('/')
      } else {
        setLoginError('Credentials are not correct') // Set the error message
      }
    }
  }

  const fakeLoginApi = async (username: string, password: string) => {
    // Simulating a login API response
    if (username === 'testuser' && password === 'testpass') {
      return { success: true }
    }
    return { success: false }
  }

  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)

  const handleForgotPasswordOpen = () => {
    setIsForgotPasswordOpen(true)
  }

  const handleForgotPasswordClose = () => {
    setIsForgotPasswordOpen(false)
  }

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
    setLoginError('') // Clear the login error on input change
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative', width: '500px', height: '40px' }}>
              <Image src={logoPath} alt='Logo' layout='fill' objectFit='contain' />
            </Box>
          </Box>

          <Typography
            variant='h5'
            sx={{
              fontWeight: 600,
              marginBottom: { xs: 1, sm: 1.5, md: 5 }, // Responsive marginBottom
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: { xs: 'center', sm: 'center' }, // Center alignment for all screens
              fontSize: { xs: '1rem', sm: '.2rem', md: '1.4rem' } // Responsive font sizes
            }}
          >
            #oneclicktoconnect 🚀
          </Typography>

          <Box
            sx={{
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(6,2,2,0.3)'
            }}
          >
            <Button>
              <IconButton component='a'>
                <Box sx={{ width: '20px', height: '20px', position: 'relative' }}>
                  <Image src={GooglePath} alt='Google Logo' layout='fill' objectFit='contain' />
                </Box>
              </IconButton>
              <Box sx={{}}>
                <Typography variant='body1'>Google</Typography>
              </Box>
            </Button>
          </Box>

          <Divider sx={{ my: 5 }}>or</Divider>

          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id='username'
              label='User Name'
              value={values.username}
              onChange={handleChange('username')}
              error={!!errors.username}
              helperText={errors.username}
              sx={{ marginBottom: 4 }}
            />

            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                error={!!errors.password}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <Typography color='error' variant='body2'>
                  {errors.password}
                </Typography>
              )}
            </FormControl>

            {loginError && ( // Display login error message
              <Typography color='error' variant='body2' sx={{ mt: 2 }}>
                {loginError}
              </Typography>
            )}

            <Box
              sx={{ mb: 5, mt: 2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}
            >
              <Typography
                variant='body2'
                sx={{ cursor: 'pointer', color: theme.palette.primary.main }}
                onClick={handleForgotPasswordOpen}
              >
                Forgot Password?
              </Typography>
            </Box>
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} onClick={handleSubmit}>
              Login
            </Button>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: { xs: 'column', sm: 'row' }, // Change direction based on screen size
                alignItems: 'center'
              }}
            >
              <Typography variant='body2' sx={{ marginRight: { xs: 0, sm: 2 }, marginBottom: { xs: 1, sm: 0 } }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <ForgotPassword open={isForgotPasswordOpen} handleClose={handleForgotPasswordClose} />
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
