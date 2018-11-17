import React from 'react';
import PropTypes from 'prop-types';
import { authStore } from '../../lib/store';
import moment from 'moment';
import { orderBy } from 'lodash';
import './sidebar-panel.css';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.submitComment = this.submitComment.bind(this);
  }

  async submitComment(e) {
    e.persist();
    e.preventDefault();
    const body = { author: authStore.user.email, body: e.target[0].value };
    await this.props.submitComments(body).then((e.target[0].value = ''));
  }

  render() {
    const { comments } = this.props;
    const sorted = orderBy(comments, 'created_at', 'desc');
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
                    ? 'own'
                    : 'not-own'
                }`}>
                <div className="text">{comment.body}</div>
                <div className="meta">
                  <span className="author">
                    {comment.author.email === authStore.user.email
                      ? 'Me'
                      : comment.author.name}{' '}
                    -{' '}
                  </span>
                  <span className="date">
                    {moment(comment.created_at).format('Do MMM YYYY HH:mm:ss')}
                  </span>
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
  comments: PropTypes.array.isRequired,
  submitComments: PropTypes.func
};

export default Comments;
