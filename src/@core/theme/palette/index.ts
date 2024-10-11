// ** Type Imports
import { PaletteMode } from '@mui/material'
import { ThemeColor } from 'src/@core/layouts/types'

const DefaultPalette = (mode: PaletteMode, themeColor: ThemeColor) => {
  // ** Vars
  const lightColor = '58, 53, 65' // Text color in light mode (dark text)
  const darkColor = '231, 227, 252' // Text color in dark mode (light text)
  const mainColor = mode === 'light' ? lightColor : darkColor

  const primaryGradient = () => {
    if (themeColor === 'secondary') {
      return '#F15A29' // Your secondary orange color
    } else if (themeColor === 'primary') {
      return '#03c9D7' // Your primary blue color
    } else if (themeColor === 'success') {
      return '#93DD5C' // Keeping success color the same
    } else if (themeColor === 'error') {
      return '#FF8C90' // Keeping error color the same
    } else if (themeColor === 'warning') {
      return '#FFCF5C' // Keeping warning color the same
    } else {
      return '#6ACDFF' // Keeping this as a fallback
    }
  }

  return {
    customColors: {
      main: mainColor,
      primaryGradient: primaryGradient(),
      tableHeaderBg: mode === 'light' ? '#F9FAFC' : '#3D3759' // Keeping the table header colors the same
    },
    common: {
      black: '#000',
      white: '#FFF'
    },
    mode: mode,
    primary: {
      light: '#F15A29', // Lighter shade of your orange
      main: '#F15A29', // Your secondary orange
      dark: '#F15A29', // Darker shade of your orange
      contrastText: '#FFF' // White text on secondary color
    },
    secondary: {
      light: '#03c9D7', // Lighter shade of your primary blue
      main: '#03c9D7', // Your primary blue
      dark: '#03c9D7', // Darker shade of your primary blue
      contrastText: '#000' // White text on primary color
    },
    success: {
      light: '#6AD01F', // Keeping success green
      main: '#56CA00',
      dark: '#4CB200',
      contrastText: '#FFF'
    },
    error: {
      light: '#FF6166',
      main: '#FF4C51',
      dark: '#E04347',
      contrastText: '#FFF'
    },
    warning: {
      light: '#FFCA64',
      main: '#FFB400',
      dark: '#E09E00',
      contrastText: '#FFF'
    },
    info: {
      light: '#32BAFF',
      main: '#16B1FF',
      dark: '#139CE0',
      contrastText: '#FFF'
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#D5D5D5',
      A200: '#AAAAAA',
      A400: '#616161',
      A700: '#303030'
    },
    text: {
      primary: mode === 'light' ? '#292929' : '#FFF', // Black in light mode, white in dark mode
      secondary: mode === 'light' ? '#000' : '#FFF', // Same for secondary text
      disabled: `rgba(${mainColor}, 0.38)` // Keeping disabled text lighter
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? '#FFF' : '#000', // White in light mode, black in dark mode
      default: mode === 'light' ? '#F4F5FA' : '#000' // Black background for dark mode
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.3)`,
      disabledBackground: `rgba(${mainColor}, 0.18)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  }
}

export default DefaultPalette
