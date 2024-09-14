import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const spbeMalKotTheme = createTheme({
  palette: {
    secondary: {
      main: grey[600],
      contrastText: "white",
    },
  },
  /* Write Theme Here */
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 0,
        },
      },
    },
  },
});

export default spbeMalKotTheme;
