import React, { Component } from "react";

import Landing from "./pages/landingpage/Landing";

// import "./bootstrap.css";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="*" component={Landing} />
      </BrowserRouter>
    );
  }
}

export default App;
