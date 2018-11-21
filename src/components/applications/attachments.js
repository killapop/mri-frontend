import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { baseURL } from '../../lib/api-calls';
import { authStore } from '../../lib/store';
import { add as addMessage } from '../../lib/message';

import './sidebar-panel.css';

class Attachments extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      fileContents: '',
      fileName: ''
    };
    this.downloadFile = this.downloadFile.bind(this);
  }

  async uploadfile(e) {
    e.persist();
    const formData = new FormData(e.target);
    e.preventDefault();
    await this.props.uploadFiles(formData).then(e.target.reset());
  }

  async downloadFile(e) {
    e.persist();
    const fileName = e.target.dataset.filename;
    const path = baseURL + this.props.match.url + '/attachments/' + fileName;
    await fetch(path, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + authStore.token
      }
    })
      .then(response => {
        response.blob().then(b => {
          if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(b, fileName);
          else {
            var a = document.createElement('a'),
              url = URL.createObjectURL(b);
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
            }, 0);
          }
        });
      })
      .catch(err => {
        addMessage('danger', 'Error retrieving file');
      });
  }

  render() {
    const { attachments } = this.props;
    return (
      <div className="comments-panel pv3">
        <form
          encType="multipart/form-data"
          className="comments-form"
          onSubmit={e => this.uploadfile(e)}>
          <div className="form-group flex flex-column overflow-x-hidden justify-between items-end">
            <input name="files" type="file" required className="self-start" />
            <button type="submit" className="flex f7 b pv1 ph2 br1">
              <i className="fa fa-file-upload mr2" />upload
            </button>
          </div>
        </form>
        <div className="">
          {attachments.length > 0 ? (
            <div>
              {attachments.map((item, idx) => (
                <div key={idx} className="history-item">
                  <i
                    onClick={e => this.downloadFile(e)}
                    className="fa fa-download"
                    data-url={item.url}
                    data-filename={item.fileName}
                  />
                  {item.fileName}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty ">No attachments</div>
          )}
        </div>
      </div>
    );
  }
}

Attachments.propTypes = {
  attachments: PropTypes.array,
  uploadFiles: PropTypes.func,
  formId: PropTypes.string
};

export default withRouter(Attachments);
