import React, { Component } from "react";
import FormField from "./form-field";
import { Field, reduxForm } from "redux-form";

import "../styles/post-box.css";

class PostBoxForm extends Component {
  onSubmit(data) {
    return this.props.onPublish(data).then(() => {
      this.props.reset();
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="postbox">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit(data => this.onSubmit(data))}>
              <Field
                name="post"
                type="textarea"
                component={FormField}
                placeholder="What's going on?"
              />
              <div className="row">
                <div className="col-3 offset-9">
                  <div className="row">
                    <div className="col-6">
                      <Field
                        name="audience"
                        type="select"
                        component={FormField}
                      >
                        <option value="public">Public</option>
                        <option value="friends">Friends</option>
                      </Field>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-primary float-right mr-1">
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const validate = (values, props) => {
  const errors = {};

  if (!values.post) {
    errors.post = "post cannot be empty";
  }

  return errors;
};

export default reduxForm({
  form: "postBox",
  validate,
  initialValues: {
    audience: "public"
  }
})(PostBoxForm);
