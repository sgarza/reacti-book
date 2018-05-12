import React, { Component } from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import PostBox from "../containers/post-box.container";

class Home extends Component {
  get isAuthenticated() {
    const { auth } = this.props;

    if (isLoaded(auth)) {
      if (auth.uid) {
        return true;
      }

      return false;
    }
  }

  renderBody() {
    if (this.isAuthenticated) {
      return <PostBox />;
    }

    return (
      <div>
        <h1>Home</h1>
        <p>Welcome home!</p>
        <button onClick={() => this.props.changePage()}>About me</button>
      </div>
    );
  }

  render() {
    return <div>{this.renderBody()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push("/about-me")
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
