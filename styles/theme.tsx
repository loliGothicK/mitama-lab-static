import { pink } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: pink[600],
        },
        secondary: {
          main: pink[700],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: pink[400],
        },
        secondary: {
          main: pink[200],
        },
      },
    },
  },
});

export default theme;
