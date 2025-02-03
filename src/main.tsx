import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOMClient.createRoot(rootElement);
  root.render(<App />);
}
