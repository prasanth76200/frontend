// ** React Import
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

const logoPath = '/images/logos/logo.png'

import Image from 'next/image'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
  verticalNavMenuBranding?: (props?: any) => ReactNode
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '20px',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

// const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
//   fontWeight: 600,
//   lineHeight: 'normal',
//   textTransform: 'uppercase',
//   color: theme.palette.text.primary,
//   transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
// }))

// const StyledLink = styled('a')({
//   display: 'flex',
//   alignItems: 'center',
//   textDecoration: 'none'
// })

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

  // ** Hooks
  const theme = useTheme()

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href='/' passHref>
          <Box sx={{ position: 'relative', width: '500px', height: '40px' }}>
            <Image src={logoPath} alt='Logo' layout='fill' objectFit='contain' />
          </Box>
        </Link>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
