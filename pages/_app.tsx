import { useState, useEffect } from "react";
import type { AppProps, AppContext } from "next/app";
import "../styles/globals.css";
import Cookies from "js-cookie";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme, customTheme } from "../themes";
import { Theme } from "@mui/material";

interface Props extends AppProps {
  theme: "light" | "dark" | "custom";
}

function MyApp({ Component, pageProps }: Props) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    const cookieTheme = Cookies.get("theme");
    const selectedTheme: Theme =
      cookieTheme === "light"
        ? lightTheme
        : cookieTheme === "dark"
        ? darkTheme
        : customTheme;
    setCurrentTheme(selectedTheme);
  }, []);
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
