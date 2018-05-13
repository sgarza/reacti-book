import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { isLoaded, firebaseConnect, populate } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Post from "./post.container";
import "../styles/post-list.css";

const populates = [{ child: "owner", root: "users" }];

const PUBLIC_AUDIENCE = "public";
const FRIENDS_AUDIENCE = "friends";

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: null
    };
  }

  setFilter(filter) {
    this.setState({
      filter
    });
  }

  unsetFilter() {
    this.setState({
      filter: null
    });
  }

  renderPosts() {
    const { posts } = this.props;
    const { filter } = this.state;

    return Object.keys(posts)
      .reverse()
      .map(id => {
        return {
          id,
          ...posts[id]
        };
      })
      .filter(post => {
        if (!filter) {
          return true;
        }

        if (post.audience === filter) {
          return true;
        }

        return false;
      })
      .map(post => {
        return this.renderPost(post);
      });
  }

  renderPost(post) {
    return <Post key={post.id} post={post} />;
  }

  render() {
    if (!isLoaded(this.props.posts)) {
      return <div>Loading</div>;
    }

    return (
      <div className="post-list">
        <div className="row">
          <div className="col-12">
            <p className="filters">
              <span>Show:</span>
              <Link to="#" onClick={() => this.unsetFilter()}>
                All
              </Link>
              <Link to="#" onClick={() => this.setFilter(PUBLIC_AUDIENCE)}>
                Public
              </Link>
              <Link to="#" onClick={() => this.setFilter(FRIENDS_AUDIENCE)}>
                Friends
              </Link>
            </p>
          </div>
        </div>
        <div className="posts">{this.renderPosts()}</div>
      </div>
    );
  }
}

const enhance = compose(
  firebaseConnect([{ path: "posts", populates }]),
  connect(({ firebase }) => ({
    posts: populate(firebase, "posts", populates)
  }))
);

export default enhance(PostList);
