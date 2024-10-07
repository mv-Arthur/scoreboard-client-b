import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./styled/GlobalStyle";

// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
     <>
          <GlobalStyle />
          <App />
     </>,
);

postMessage({ payload: "removeLoading" }, "*");
