import React, { Component } from "react";
import { Link } from "react-router-dom";
import SigninForm from "../components/signin-form";
import { firebaseConnect } from "react-redux-firebase";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.onSignin = this.onSignin.bind(this);

    this.state = {
      redirectTo: false
    };
  }

  componentWillMount() {}

  onSignin(data) {
    const { firebase } = this.props;
    return firebase.login(data).then(() => {
      this.setState({
        redirectTo: "/"
      });
    });
  }

  redirect() {
    window.location = this.state.redirectTo;
    return null;
  }

  render() {
    if (this.state.redirectTo) return this.redirect();

    return (
      <div className="signup">
        <div className="row justify-content-center mt-4 pt-4">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h1>Sign in to Reactibook</h1>
                <SigninForm onSignin={this.onSignin} />

                <p className="text-center">
                  <small>
                    Don't have an account <Link to="/signup">Sign up</Link>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default firebaseConnect()(SignIn);
