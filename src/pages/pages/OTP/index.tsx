import * as React from 'react'
import { Input as BaseInput } from '@mui/base/Input'
import { Box, styled } from '@mui/system'
import { Button, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { Card } from 'mdi-material-ui'

function OTP({
  separator,
  length,
  value,
  onChange
}: {
  separator?: React.ReactNode // Optional prop
  length: number
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
}) {
  const inputRefs = React.useRef<HTMLInputElement[]>(new Array(length).fill(null))

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex]
    targetInput.focus()
  }

  const selectInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex]
    targetInput.select()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, currentIndex: number) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        event.preventDefault()
        break
      case 'ArrowLeft':
        event.preventDefault()
        if (currentIndex > 0) {
          focusInput(currentIndex - 1)
          selectInput(currentIndex - 1)
        }
        break
      case 'ArrowRight':
        event.preventDefault()
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1)
          selectInput(currentIndex + 1)
        }
        break
      case 'Delete':
        event.preventDefault()
        onChange(prevOtp => {
          const otp = prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1)
          return otp
        })

        break
      case 'Backspace':
        event.preventDefault()
        if (currentIndex > 0) {
          focusInput(currentIndex - 1)
          selectInput(currentIndex - 1)
        }

        onChange(prevOtp => {
          const otp = prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1)
          return otp
        })
        break

      default:
        break
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, currentIndex: number) => {
    const currentValue = event.target.value
    let indexToEnter = 0

    while (indexToEnter <= currentIndex) {
      if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
        indexToEnter += 1
      } else {
        break
      }
    }
    onChange(prev => {
      const otpArray = prev.split('')
      const lastValue = currentValue[currentValue.length - 1]
      otpArray[indexToEnter] = lastValue
      return otpArray.join('')
    })
    if (currentValue !== '') {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1)
      }
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>, currentIndex: number) => {
    selectInput(currentIndex)
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>, currentIndex: number) => {
    event.preventDefault()
    const clipboardData = event.clipboardData

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes('text/plain')) {
      let pastedText = clipboardData.getData('text/plain')
      pastedText = pastedText.substring(0, length).trim()
      let indexToEnter = 0

      while (indexToEnter <= currentIndex) {
        if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
          indexToEnter += 1
        } else {
          break
        }
      }

      const otpArray = value.split('')

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? ' '
        otpArray[i] = lastValue
      }

      onChange(otpArray.join(''))
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <BaseInput
            slots={{
              input: InputElement
            }}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: (ele: HTMLInputElement) => {
                  inputRefs.current[index] = ele!
                },
                onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(event, index),
                onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, index),
                onClick: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => handleClick(event, index),
                onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => handlePaste(event, index),
                value: value[index] ?? ''
              }
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  )
}

export default function OTPInput() {
  const [otp, setOtp] = React.useState<string>('')
  const [error, setError] = React.useState<string>('')
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value)
  }

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.')
      return
    }
    setError('')

    // Here you would send the OTP to your backend for verification
    const isVerified = await verifyOtp(otp)

    if (isVerified) {
      // Redirect to the next page or dashboard
      router.push('/')
    } else {
      setError('Invalid OTP. Please try again.')
    }
  }

  // Mock function to simulate OTP verification
  const verifyOtp = async (otp: string): Promise<boolean> => {
    // Replace this with your actual OTP verification logic
    return otp === '123456'
  }
  return (
    <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2, // space between inputs
          padding: 2, // padding around the container
          border: '1px solid rgba(0, 0, 0, 0.1)', // optional border
          borderRadius: 1, // rounded corners
          backgroundColor: 'background.paper' // container background
        }}
      >
        <Typography variant='h6' sx={{ mb: 2, textAlign: 'center' }}>
          Enter the OTP sent to your email
        </Typography>
        <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <OTP separator={<span>-</span>} value={otp} onChange={setOtp} length={6} />
        </Box>

        {error && (
          <Typography color='error' sx={{ mt: 1, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
        <Button fullWidth variant='contained' sx={{ mt: 1 }} onClick={handleSubmit}>
          Verify OTP
        </Button>
      </Box>
    </Box>
  )
}

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2'
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025'
}

const InputElement = styled('input')(
  ({ theme }) => `
  width: 40px;
  height: 40px; /* Specify height to prevent small box */
  font-family: 'BM Plex Sans', sans-serif;
  font-size: 1.25rem; /* Increase font size for better visibility */
  font-weight: 400;
  line-height: 1.5;
  padding: 0;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // Prevent Firefox default outline
  &:focus-visible {
    outline: 0;
  }

  // To prevent box appearance
  appearance: none; /* Remove default styling */
  -webkit-appearance: none; /* Remove default styling for Safari */
  -moz-appearance: none; /* Remove default styling for Firefox */
`
)
