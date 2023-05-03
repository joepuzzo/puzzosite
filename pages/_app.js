import React, { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/dist/react";
import "../styles/globals.css";
import "../styles/prism.css";

export const AppContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("theme-dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "theme-dark" ? "theme-light" : "theme-dark"));
    document.querySelector("html").classList.toggle("theme-dark");
    document.querySelector("html").classList.toggle("theme-light");
  };

  useEffect(() => {
    document.querySelector("html").classList.add("theme-dark");
  }, []);

  return (
    <AppContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div id="portal-root"></div>
      <Component {...pageProps} />
      <Analytics />
    </AppContext.Provider>
  );
}

export default MyApp;
