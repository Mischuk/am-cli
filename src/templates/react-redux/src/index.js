import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "../node_modules/ress/ress.css";
import App from "./components/App/App";
import { PlaceholderServiceProvider } from "./contexts/PlaceholderServiceContext";
import PlaceholderService from "./services/PlaceholderService";
import { store } from "./store/configureStore";
const placeholderService = new PlaceholderService();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PlaceholderServiceProvider value={placeholderService}>
        <Router>
          <App />
        </Router>
      </PlaceholderServiceProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
