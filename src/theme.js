// import { createMuiTheme } from "@material-ui/core/styles";
// import { teal, purple } from "@material-ui/core/colors";
import { createTheme } from "@mui/material/styles";
import { teal } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: '#9500ae',
    },
  },
});

export default theme;
