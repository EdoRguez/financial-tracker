import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { ChakraProvider } from "@chakra-ui/react"
import customTheme  from "../chakraui.config.ts"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)

