import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import SecondaryPage from "../../pages/SecondaryPage";
import { fetchUser } from "../../store/actions/user";
import Header from "../Header/Header";
import "./App.scss";

function App({ user, getUser }) {
  useEffect(() => {
    getUser(1);
  }, [getUser]);

  return (
    <div className="app">
      <Header />

      <Switch>
        <Route exact path="/">
          <HomePage user={user} />
        </Route>
        <Route path="/secondary">
          <SecondaryPage user={user} />
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = store => {
  const { user } = store;

  return {
    user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: value => dispatch(fetchUser(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
