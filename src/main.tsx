import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Global, ThemeProvider } from "@emotion/react";
import ResetStyle from "./styles/GlobalStyle";
import Theme from "./styles/Theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Global styles={ResetStyle} />
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
