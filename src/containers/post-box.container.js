import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { isLoaded, firebaseConnect, populate } from "react-redux-firebase";
import PostBoxForm from "../components/post-box-form";

const populates = [{ child: "owner", root: "users" }];

class PostBox extends Component {
  constructor(props) {
    super(props);
    this.onPublish = this.onPublish.bind(this);
  }

  onPublish(data) {
    const { firebase } = this.props;

    firebase.push("posts", data).then(() => {
      console.log("post added");
    });
  }

  render() {
    return <PostBoxForm onPublish={this.onPublish} />;
  }
}

const enhance = compose(
  firebaseConnect([{ path: "posts", populates }]),
  connect(({ firebase }) => ({
    todos: populate(firebase, "posts", populates)
  }))
);

export default enhance(PostBox);
