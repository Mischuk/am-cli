import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import SecondaryPage from "../../pages/SecondaryPage";
import Header from "../Header/Header";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />

      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/secondary">
          <SecondaryPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
