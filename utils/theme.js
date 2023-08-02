import { createTheme, responsiveFontSizes } from '@mui/material/styles'

let theme = createTheme({
  spacing: 8,

  palette: {
    primary: {
      main: '#42637B',
      dark: '#293F4F'
    },
    secondary: {
      light: '#E7E7E7',
      main: '#D1D7DC'
    }
  },

  typography: {
    // fontSize: 13,
    htmlFontSize: 19
  },

  overrides: {
    MuiAccordion: {
      root: {
        '&$expanded': {
          margin: 0,

          '&:before': {
            opacity: 1
          }
        }
      }
    },
    MuiAccordionSummary: {
      root: {
        '&$expanded': {
          minHeight: '48px'
        }
      },

      content: {
        '&$expanded': {
          margin: '12px 0'
        }
      }
    }
  }
})
theme = responsiveFontSizes(theme)

export default theme
