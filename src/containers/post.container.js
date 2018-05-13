import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { Field, reduxForm, change } from "redux-form";
import FormField from "../components/form-field";
import "../styles/post.css";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  onSubmit(data) {
    const { id, post } = data;

    this.props.firebase.update(`posts/${id}`, { post }).then(() => {
      this.disableEdit();
    });
  }

  onDelete() {
    const { post } = this.props;

    if (
      window.confirm("Are you sure you want to delete this post permanently?")
    ) {
      this.props.firebase.remove(`posts/${post.id}`);
    }
  }

  enableEdit() {
    const { post } = this.props;
    this.setState(
      {
        editing: true
      },
      () => {
        this.props.changeFieldValue(`post-${post.id}`, post.post);
      }
    );
  }

  disableEdit() {
    this.setState({
      editing: false
    });
  }

  renderContent() {
    const { editing } = this.state;
    const { post, handleSubmit } = this.props;

    if (editing) {
      return (
        <form
          onSubmit={handleSubmit(data =>
            this.onSubmit({ id: post.id, post: data[`post-${post.id}`] })
          )}
        >
          <Field
            type="textarea"
            name={`post-${post.id}`}
            component={FormField}
          />
          <button className="btn btn-primary float-right">Update</button>
        </form>
      );
    }

    return post.post;
  }

  render() {
    const { editing } = this.state;

    return (
      <div className="post card mb-4 p-4">
        <div className="card-body">{this.renderContent()}</div>
        <div className="card-footer text-muted text-right small">
          <Link
            to="#"
            onClick={() => (editing ? this.disableEdit() : this.enableEdit())}
          >
            {editing ? "Cancel" : "Edit"}
          </Link>
          <Link to="#" onClick={() => this.onDelete()}>
            Delete
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeFieldValue: function(field, value) {
      dispatch(change("postForm", field, value));
    }
  };
};

export default firebaseConnect()(
  connect(null, mapDispatchToProps)(
    reduxForm({
      form: "postForm"
    })(Post)
  )
);
