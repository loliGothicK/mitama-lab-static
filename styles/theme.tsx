import { pink } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: pink[600],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: pink[400],
        },
      },
    },
  },
});
