import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { baseURL } from "../../lib/api-calls";
import { authStore } from "../../lib/store";
import { apiCall } from "../../lib/api-calls";
import { add as addMessage } from "../../lib/message";

import "./sidebar-panel.css";

class Attachments extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      attachments: [],
      fileContents: "",
      fileName: "",
      attachmentToDelete: null,
      isConfirmOpen: false
    };
    this.fetchAttachments = this.fetchAttachments.bind(this);
    this.deleteAttachment = this.deleteAttachment.bind(this);
    this.uploadAttachment = this.uploadAttachment.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
  }

  async componentDidMount() {
    this.fetchAttachments();
  }

  async fetchAttachments() {
    await apiCall(
      "GET",
      "/" +
        this.props.entityType +
        "/" +
        this.props.match.params.id +
        "/attachments",
      "",
      true
    )
      .then(data => {
        this.setState(state => ({ attachments: data }));
      })
      .catch(err => console.log(err));
  }

  async deleteAttachment(e) {
    e.persist();
    await apiCall(
      "DELETE",
      "/" +
        this.props.entityType +
        "/" +
        this.props.match.params.id +
        "/attachments/" +
        e.target.dataset.filename,
      "",
      true
    )
      .then(data => {
        if (data === 204) {
          this.fetchAttachments();
          addMessage("success", "Attachment deleted");
          this.setState({ isConfirmOpen: false, attachmentToDelete: null });
        }
      })
      .catch(err => {
        console.log(err);
        addMessage("danger", "Error deleting the attachment");
      });
  }

  async uploadAttachment(e) {
    e.persist();
    const formData = new FormData(e.target);
    e.preventDefault();
    await apiCall(
      "POST",
      "/" +
        this.props.entityType +
        "/" +
        this.props.match.params.id +
        "/attachments",
      formData,
      true,
      "form"
    )
      .then(data => {
        if (data === 204) {
          this.fetchAttachments();
          e.target.reset();
          addMessage("success", "Attachment uploaded");
        }
      })
      .catch(err => {
        console.log(err);
        addMessage("danger", "There was an error uploading the attachment");
      });
  }

  async downloadFile(e) {
    e.persist();
    const fileName = e.target.dataset.filename;
    const path = baseURL + this.props.match.url + "/attachments/" + fileName;
    await fetch(path, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + authStore.token
      }
    })
      .then(response => {
        response.blob().then(b => {
          if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(b, fileName);
          else {
            var a = document.createElement("a"),
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
        addMessage("danger", "Error retrieving file");
      });
  }

  toggleConfirm(e) {
    this.setState({
      isConfirmOpen: !this.state.isConfirmOpen,
      attachmentToDelete: e.target.dataset.filename
    });
  }

  render() {
    const { attachments, isConfirmOpen, attachmentToDelete } = this.state;
    return (
      <div className="comments-panel pv3">
        {isConfirmOpen ? (
          <div className="confirm">
            <div className="confirm-background"></div>
            <div className="confirm-content">
              <div className="confirm-text">
                <p>
                  <i className="left fa fa-2x fa-info-circle mr4" />
                  You are about a delete an attachment. This step cannot be
                  reversed. Please proceed with caution!
                </p>
              </div>
              <div className="confirm-actions">
                <button className="text" onClick={e => this.toggleConfirm(e)}>
                  Cancel
                </button>
                <button
                  onClick={e => this.deleteAttachment(e)}
                  data-filename={attachmentToDelete}
                >
                  <i className="fa fa-trash" /> Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <form
          encType="multipart/form-data"
          className="comments-form"
          onSubmit={e => this.uploadAttachment(e)}
        >
          <div className="form-group flex flex-column overflow-x-hidden justify-between items-end">
            <input name="files" type="file" required className="self-start" />
            <button type="submit" className="flex f7 b pv1 ph2 br1">
              <i className="fa fa-file-upload mr2" />
              upload
            </button>
          </div>
        </form>
        <div className="">
          {attachments ? (
            <div>
              {attachments.map((item, idx) => (
                <div key={idx} className="attachment relative history-item">
                  <i
                    onClick={e => this.downloadFile(e)}
                    className="fa fa-download download"
                    data-url={item.url}
                    data-filename={item.fileName}
                  />
                  {item.fileName}
                  {authStore.user.roles.indexOf("mri-staff") !== -1 ? (
                    <i
                      onClick={e => this.toggleConfirm(e)}
                      data-filename={item.fileName}
                      className="delete fa fa-trash right"
                      title="Delete attachment"
                    />
                  ) : (
                    ""
                  )}
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
  formId: PropTypes.string,
  entityType: PropTypes.string
};

export default withRouter(Attachments);
