import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import validator from "validator";
import FormField from "../components/form-field";

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  onSubmit(data) {
    this.props.onSignup(data).catch(e => {
      this.setState({ error: e.message });
    });
  }

  renderError() {
    if (this.state.error) {
      return <div className="error">{this.state.error}</div>;
    }

    return null;
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        {this.renderError()}
        <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
          <Field
            name="username"
            type="username"
            component={FormField}
            label="Username"
          />
          <Field
            name="email"
            type="email"
            component={FormField}
            label="Your email"
          />
          <Field
            name="password"
            type="password"
            component={FormField}
            label="Pick a password"
          />
          <button type="submit" className="btn btn-primary btn-block">
            Signup
          </button>
        </form>
      </div>
    );
  }
}

const validate = (values, props) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email cannot be empty";
  }

  if (!values.password) {
    errors.password = "Password cannot be empty";
  }

  if (values.email && !validator.isEmail(values.email)) {
    errors.email = "Email is invalid";
  }

  if (values.password && values.password.split("").length < 8) {
    errors.password = "Password must be 8 characters min";
  }

  return errors;
};

export default reduxForm({
  form: "signupForm",
  validate
})(SignupForm);
