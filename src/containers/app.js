import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "../components/home";
import About from "../components/about";

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-me">About me</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-me" component={About} />
    </main>
  </div>
);

export default App;
