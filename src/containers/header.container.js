import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isLoaded, firebaseConnect } from "react-redux-firebase";

class Header extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  get isAuthenticated() {
    const { auth } = this.props;

    if (isLoaded(auth)) {
      if (auth.uid) {
        return true;
      }

      return false;
    }
  }

  onLogout() {
    this.props.firebase.logout();
  }

  renderWelcome() {
    if (this.isAuthenticated) {
      const { auth } = this.props;
      return <div className="welcome">Welcome {auth.email}</div>;
    }

    return null;
  }

  renderAuthButtons() {
    if (this.isAuthenticated) {
      return (
        <Link to="#" onClick={() => this.onLogout()}>
          Logout
        </Link>
      );
    }

    return <Link to="/signin">Signin</Link>;
  }

  render() {
    return (
      <header>
        {this.renderWelcome()}
        <Link to="/">Home</Link>
        <Link to="/about-me">About me</Link>
        {this.renderAuthButtons()}
      </header>
    );
  }
}

const mapStateToProps = state => {
  const { auth, profile } = state.firebase;

  return {
    auth,
    profile
  };
};

export default firebaseConnect()(connect(mapStateToProps)(Header));
