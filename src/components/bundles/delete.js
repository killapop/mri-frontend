import React from "react";
import { Redirect, Link } from "react-router-dom";
import { view } from "@risingstack/react-easy-state";
import SmallBox from "../common/smallBox";
import { authStore } from "../../lib/store";
import { apiCall } from "../../lib/api-calls";
import { map } from "lodash";
import { add as addMessage } from "../../lib/message";

class DeleteApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      deleted: false
    };
    this.delete = this.delete.bind(this);
  }

  async componentDidMount() {
    await apiCall(
      "GET",
      "/bundles/" + this.props.match.params.id,
      "",
      true
    ).then(data => {
      if (data) {
        this.setState(state => ({
          applications: map(data.applications, "id")
        }));
      }
    });
  }

  async delete() {
    await apiCall(
      "DELETE",
      "/bundles/" + this.props.match.params.id,
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
            `Bundle with id ${this.props.match.params.id} has been deleted`
          );
        } else {
          addMessage("danger", "There was an error deleting the bundle.");
        }
      })
      .catch(err => {
        addMessage("danger", "There was an error deleting the bundle.");
      });
  }

  render() {
    if (authStore.token === "" || this.state.deleted) {
      return <Redirect to="/" />;
    }
    return (
      <SmallBox>
        <div>
          <h3>
            Are you sure you want to delete the bundle -{" "}
            {this.props.match.params.id}?
          </h3>
          {this.state.applications.length > 0 ? (
            <ul className="pa0 ma0 list mt2">
              This Bundle has {this.state.applications.length} applications
              currently associated. {` `}
              {map(this.state.applications, application => (
                <li key={application} className="mv2">
                  <Link to={`/applications/${application}`}>
                    {`${application},`}
                    {`  `}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
          <h3 className="red">
            {" "}
            Please note: Deleting this bundle will dissociate the above
            applications but NOT delete them. This step cannot be reversed so
            proceed with caution.
          </h3>
          <input
            className="form-control"
            type="button"
            value="Yes. I am sure!"
            onClick={this.delete}
          />
        </div>
        <Link to="/dashboard">Cancel and return to the dashboard</Link>
      </SmallBox>
    );
  }
}
export default view(DeleteApplication);
