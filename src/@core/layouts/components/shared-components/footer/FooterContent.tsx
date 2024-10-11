// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  // const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* {hidden ? null : ( */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
        <Link
          target='_blank'
          href='https://github.com/themeselection/LinktoSync-mui-react-nextjs-admin-template-free/blob/main/LICENSE'
        >
          Privacy
        </Link>
        <Link target='_blank' href='https://themeselection.com/'>
          Terms & Condition
        </Link>
        <Link target='_blank' href='https://themeselection.com/'>
          Cookies info
        </Link>
      </Box>
      {/* )} */}
    </Box>
  )
}

export default FooterContent
