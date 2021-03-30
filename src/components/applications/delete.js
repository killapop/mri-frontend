import React from "react";
import { Redirect, Link } from "react-router-dom";
import { view } from "@risingstack/react-easy-state";
import SmallBox from "../common/smallBox";
import { authStore } from "../../lib/store";
import { apiCall } from "../../lib/api-calls";
import { add as addMessage } from "../../lib/message";

class DeleteApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bundle: "",
      deleted: false
    };
    this.delete = this.delete.bind(this);
  }

  async componentDidMount() {
    await apiCall(
      "GET",
      "/applications/" + this.props.match.params.id,
      "",
      true
    ).then(data => {
      if (data) {
        this.setState(state => ({ bundle: data.bundle }));
      }
    });
  }

  async delete() {
    await apiCall(
      "DELETE",
      "/applications/" + this.props.match.params.id,
      "",
      true
    )
      .then(statusCode => {
        if (statusCode === 204) {
          this.setState(state => ({
            deleted: true
          }));
          addMessage(
            "success",
            `Application with id ${this.props.match.params.id} has been deleted`
          );
        } else {
          addMessage("danger", "There was an error deleting the application.");
        }
      })
      .catch(err => {
        addMessage("danger", "There was an error deleting the application.");
      });
  }

  render() {
    if (authStore.token === "" || this.state.deleted) {
      return <Redirect to="/" />;
    }
    return (
      <SmallBox>
        {this.state.bundled ? (
          <div>
            <h3>
              This application is associated with a bundle -{" "}
              <Link to={`/bundles/${this.state.bundle}`}>
                {this.state.bundle}
              </Link>
              . Make sure to either dissociate the application from the bundle
              or delete the bundle completely before attempting to delete the
              application
            </h3>
          </div>
        ) : (
          <div>
            <h3>
              Are you sure you want to delete the application -{" "}
              {this.props.match.params.id}
            </h3>
            <h3 className="red">
              {" "}
              Please note: This step cannot be reversed so proceed with caution.
            </h3>
            <input
              className="form-control"
              type="button"
              value="Yes. I am sure!"
              onClick={this.delete}
            />
          </div>
        )}
        <Link to="/dashboard">Cancel and return to the dashboard</Link>
      </SmallBox>
    );
  }
}
export default view(DeleteApplication);
