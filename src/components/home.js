import React, { Component } from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import PostBox from "../containers/post-box.container";
import PostList from "../containers/post-list.container";

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
      return (
        <div className="home authenticated">
          <div className="row">
            <div className="col-3" />
            <div className="col-9">
              <PostBox />
              <PostList />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="home">
        <h1>Home</h1>
        <p>
          Welcome to ReactiBook, <Link to="/signup">create an account</Link> or{" "}
          <Link to="/signup">signin</Link> to continue.
        </p>
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
