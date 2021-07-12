import React from "react";
import { Redirect, Link } from "react-router-dom";
import { view } from "@risingstack/react-easy-state";
import Reactahead from "reactahead";
import _ from "lodash";
import { withTranslation } from "react-i18next";
import i18n from "../../i18n.js";
import SmallBox from "../common/smallBox";
import { authStore } from "../../lib/store";
import { apiCall } from "../../lib/api-calls";
import { add as addMessage } from "../../lib/message";

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created: false,
      users: [],
      selectedUser: "",
      role: "",
      formType: "",
      programLine: 1,
    };
    this.change = this.change.bind(this);
    this.create = this.create.bind(this);
    this.radioChange = this.radioChange.bind(this);
  }

  radioChange(e) {
    e.persist();
    this.setState({ programLine: parseInt(e.target.value, 10) });
  }

  change(o) {
    document.getElementsByClassName("reactahead-input")[0].innerText = o;
    this.setState({ selectedUser: o });
    this.my_reactahead.clearInput();
  }

  async componentDidMount() {
    const template = this.props.match.params.template === "projectProposals";
    this.setState({
      role: template ? "organization" : "beneficiary",
      formType: template ? "Project Proposal" : "Personal Statement",
    });
    await apiCall("GET", "/users", "", true)
      .then((users) => {
        if (users) {
          const urs = _.map(
            _.filter(users, (user) => _.includes(user.roles, this.state.role)),
            "email"
          );
          this.setState({ users: urs });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ users: [] });
      });
  }

  async create() {
    const formName =
      this.props.match.params.template + "-" + this.state.programLine + ".json";
    if (this.state.selectedUser) {
      await apiCall(
        "POST",
        "/applications",
        JSON.stringify({
          email: this.state.selectedUser,
          form: formName,
          facilitator: authStore.user.email || "",
        }),
        true
      ).then((data) => {
        if (data === 204) {
          this.setState({ created: true });
        } else {
          addMessage("danger", "Error: There was an error creating the form");
        }
      });
    } else {
      addMessage("warning", `Please choose the ${this.state.role}`);
    }
  }

  render() {
    const {
      created,
      role,
      selectedUser,
      users,
      formType,
      programLine,
    } = this.state;

    const { t } = this.props;

    if (authStore.token === "") {
      return <Redirect to="/" />;
    }
    return (
      <SmallBox>
        <div>
          {created ? (
            <div>
              <h4 className="f4">
                A {formType} was created for {selectedUser}.
              </h4>
              <p>
                <Link to="/dashboard">
                  Click here to return to the dashboard
                </Link>
              </p>
            </div>
          ) : (
            <div>
              <div className="form-group field field-object">
                <fieldset>
                  <legend id="root__title">Create {formType}</legend>
                  <div className="form-group field field-string">
                    <p
                      id="root_email__description"
                      className="field-description"
                    >
                      Enter the email address of the of the {role}
                    </p>
                    <Reactahead
                      api={(api) => (this.my_reactahead = api)}
                      noResultMsg="Found no users that match your search"
                      suggestions={users}
                      onSubmit={this.change}
                      placeholder={`Find ${role}`}
                    />
                    {selectedUser ? (
                      <div className="form-group mt3">
                        <label className="ttu">
                          {role}: {selectedUser}
                        </label>
                        <fieldset>
                          <div className="form-group mt2">
                            {[1, 2].map((e, i) => (
                              <span key={i} className="mr3">
                                <input
                                  type="radio"
                                  name="programeLine"
                                  value={e}
                                  id={`programLine${e}`}
                                  onChange={(el) => this.radioChange(el)}
                                  checked={programLine === e}
                                />
                                <label
                                  className="mh3"
                                  htmlFor={`programLine${e}`}
                                >
                                  Program Line {e}
                                </label>
                              </span>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    ) : (
                      ""
                    )}
                    <div />
                  </div>
                </fieldset>
                <div />
                <div />
              </div>
              <div className="form-actions form-group flex justify-end">
                <button type="submit" onClick={(e) => this.create(e)}>
                  Create form
                  <i className="fa fa-plus-circle ml2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </SmallBox>
    );
  }
}

export default withTranslation()(view(CreateForm));
