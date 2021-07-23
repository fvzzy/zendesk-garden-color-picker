import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "@zendeskgarden/css-bedrock"
import { ThemeProvider } from "styled-components"
import { DEFAULT_THEME } from "@zendeskgarden/react-theming"

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={DEFAULT_THEME}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
