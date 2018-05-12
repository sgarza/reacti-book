import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/home";
import About from "../components/about";
import SignUp from "./signup.container";
import SignIn from "./signin.container";
import Header from "./header.container";

const App = () => (
  <div>
    <Header />

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-me" component={About} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
    </main>
  </div>
);

export default App;
