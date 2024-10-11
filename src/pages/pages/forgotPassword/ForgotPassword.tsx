import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

interface ForgotPasswordProps {
  open: boolean
  handleClose: () => void
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleClose() // Close dialog after form submission
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      {/* Form wrapping dialog content */}
      <form onSubmit={handleSubmit}>
        <DialogTitle>Reset password</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <DialogContentText>
            Enter your account&apos;s email address, and we&apos;ll send you a link to reset your password.
          </DialogContentText>
          <FormControl variant='outlined' fullWidth>
            {/* Label for the email input */}
            <InputLabel htmlFor='email' sx={{ color: 'text.primary' }}>
              Email address
            </InputLabel>
            <OutlinedInput
              autoFocus
              required
              margin='dense'
              id='email'
              name='email'
              placeholder='Email address'
              type='email'
              label='Email address'
              fullWidth
            />
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' type='submit'>
            Continue
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
