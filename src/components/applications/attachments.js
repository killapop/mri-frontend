import React from 'react';
import PropTypes from 'prop-types';
import { apiCall } from '../../lib/api-calls';
import './sidebar-panel.css';

class Attachments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  uploadfile(e) {
    e.persist();
    const formData = new FormData(e.target);
    console.log(formData.get('files'));
    e.preventDefault();
    this.props.uploadFiles(formData).then((e.target[0].fileList = []));
  }

  render() {
    const { attachments } = this.props;
    return (
      <div className="comments-panel pv3">
        <form
          encType="multipart/form-data"
          className="comments-form"
          onSubmit={e => this.uploadfile(e)}>
          <div className="form-group flex">
            <input name="files" type="file" multiple="true" />
            <button className="fa fa-upload" type="submit">
              upload
            </button>
          </div>
        </form>
        {attachments ? (
          <div>
            {attachments.map((item, idx) => (
              <div key={idx}>
                {item.event} - {item.created_at}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty ">No attachments</div>
        )}
      </div>
    );
  }
}

Attachments.propTypes = {
  attachments: PropTypes.array,
  uploadFiles: PropTypes.func
};

export default Attachments;
