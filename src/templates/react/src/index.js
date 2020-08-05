import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "../node_modules/ress/ress.css";
import App from "./components/App/App";
import { PlaceholderServiceProvider } from "./contexts/PlaceholderServiceContext";
import PlaceholderService from "./services/PlaceholderService";
const placeholderService = new PlaceholderService();

ReactDOM.render(
  <React.StrictMode>
    <PlaceholderServiceProvider value={placeholderService}>
      <Router>
        <App />
      </Router>
    </PlaceholderServiceProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
