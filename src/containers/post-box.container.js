import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PostBoxForm from "../components/post-box-form";

class PostBox extends Component {
  constructor(props) {
    super(props);
    this.onPublish = this.onPublish.bind(this);
  }

  onPublish(data) {
    const { firebase } = this.props;

    return firebase.push(`posts`, data);
  }

  render() {
    return <PostBoxForm onPublish={this.onPublish} />;
  }
}
export default firebaseConnect()(connect()(PostBox));
