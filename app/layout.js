"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import {store} from "./redux/store"
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#106861",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
        </Provider>
       
      </body>
    </html>
  );
}
