import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SignupForm from "../components/signup-form";
import { signup } from "../actions";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onSignup = this.onSignup.bind(this);

    this.state = {
      redirectTo: false
    };
  }

  componentWillMount() {}

  onSignup(data) {
    return this.props.signup(data).then(() => {
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
                <h1>Signup to Reactibook</h1>
                <SignupForm onSignup={this.onSignup} />
                <p className="text-center">
                  <small>
                    Already have an account <Link to="/signin">Sign in</Link>
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

const mapStateToProps = state => {
  return {
    auth: state.firebase,
    profile: state.firebase.profile
  };
};

const actions = {
  signup
};

export default connect(mapStateToProps, actions)(SignUp);
