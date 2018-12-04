import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { orderBy } from "lodash";
import { authStore } from "../../lib/store";
import { apiCall } from "../../lib/api-calls";
import { add as addMessage } from "../../lib/message";
import "./sidebar-panel.css";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
    this.fetchComments = this.fetchComments.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  async componentDidMount() {
    this.fetchComments();
  }

  async fetchComments() {
    apiCall(
      "GET",
      "/" + this.props.entityType + "/" + this.props.entityID,
      "",
      true
    ).then(data => this.setState(state => ({ comments: data.comments })));
  }

  async submitComment(e) {
    e.persist();
    e.preventDefault();
    const body = { author: authStore.user.email, body: e.target[0].value };
    await apiCall(
      "POST",
      "/" + this.props.entityType + "/" + this.props.entityID + "/comments",
      JSON.stringify(body),
      true
    )
      .then(data => {
        if (data === 204) {
          this.fetchComments();
          addMessage("success", "Comment posted");
        }
        e.target[0].value = "";
      })
      .catch(err => {
        console.log(err);
        addMessage("danger", "Error posting the comment");
      });
  }

  async deleteComment(e) {
    e.persist();
    await apiCall(
      "DELETE",
      "/" +
        this.props.entityType +
        "/" +
        this.props.entityID +
        "/comments/" +
        e.target.dataset.id,
      "",
      true
    )
      .then(data => {
        if (data === 204) {
          this.fetchComments();
          addMessage("success", "Comment deleted");
        }
      })
      .catch(err => {
        console.log(err);
        addMessage("danger", "Error deleting the comment");
      });
  }

  render() {
    const { comments } = this.state;
    const sorted = orderBy(comments, "created_at", "desc");
    return (
      <div className="comments-panel">
        <form className="comments-form" onSubmit={e => this.submitComment(e)}>
          <div className="flex items-end">
            <textarea
              required={true}
              className="form-control ma0 mt3 mr2"
              name="body"
              placeholder="Post a comment"
              rows="4"
            />
            <button type="submit" className="flex f7 b pv1 ph2 br1">
              <i className="fa fa-comment mr2" />
              post
            </button>
          </div>
        </form>
        {comments.length > 0 ? (
          <div className="comments pv3">
            {sorted.map((comment, idx) => (
              <div
                key={idx}
                className={`comment ${
                  authStore.user.email === comment.author.email
                    ? "own"
                    : "not-own"
                }`}
              >
                <div className="text">{comment.body}</div>
                <div className="meta">
                  <span className="author">
                    {comment.author.email === authStore.user.email
                      ? "Me"
                      : comment.author.name}{" "}
                    -{" "}
                  </span>
                  <span className="date">
                    {moment(comment.created_at).format("Do MMM YYYY HH:mm:ss")}
                  </span>
                  {comment.author.email === authStore.user.email ||
                  authStore.user.roles.indexOf("mri-staff") !== -1 ? (
                    <i
                      className="fa fa-times delete"
                      title="Delete"
                      data-id={comment.id}
                      onClick={e => this.deleteComment(e)}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty ">No comments to display</div>
        )}
      </div>
    );
  }
}

Comments.propTypes = {
  entityType: PropTypes.string,
  entityID: PropTypes.string
};

export default Comments;
