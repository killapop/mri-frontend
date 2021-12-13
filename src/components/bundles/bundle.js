import React from "react";
import { Redirect, Link } from "react-router-dom";
import { Sticky } from "react-sticky";
import { view } from "@risingstack/react-easy-state";
import Reactahead from "reactahead";
import moment from "moment";
import _ from "lodash";
import { authStore } from "../../lib/store";
import { apiCall } from "../../lib/api-calls";
import { add as addMessage } from "../../lib/message";
import History from "../applications/history";
import Comments from "../applications/comments";
import Attachments from "../applications/attachments";

import "./bundle.css";

class Bundle extends React.Component {
  constructor(props) {
    super(props);
    this.updateBundle = this.updateBundle.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.tabHandler = this.tabHandler.bind(this);
    this.change = this.change.bind(this);
    this.state = {
      bundle: {},
      attachments: [],
      comments: [],
      history: [],
      type: [],
      case_worker: {},
      locked: false,
      close: false,
      containerSticky: false,
      currentTab: "attachments",
      tabs: [
        { title: "history", icon: "clipboard-list" },
        { title: "comments", icon: "comments" },
        { title: "attachments", icon: "paperclip" }
      ],
      states: [
        { label: "created", action: "created" },
        { label: "assessed", action: "assess" },
        { label: "accepted", action: "accept" },
        { label: "implemented", action: "implement" },
        { label: "reported", action: "report" }
      ]
    };
    this.associate = React.createRef();
    this.associateButton = React.createRef();
  }

  async componentDidMount() {
    this.fetchData();
  }

  getIdAndEmail(n) {
    return `${n.id} (${n.account.email})`;
  }

  async fetchData() {
    try {
      const bundleData = await apiCall(
        "GET",
        "/bundles/" + this.props.match.params.id,
        "",
        true
      );
      const attachmentData = await apiCall(
        "GET",
        "/bundles/" + this.props.match.params.id + "/attachments",
        "",
        true
      );
      const applicationData = await apiCall("GET", "/applications", "", true);

      this.setState(state => ({
        applications: _.map(
          _.filter(applicationData, application => !application.bundle),
          this.getIdAndEmail
        ),
        bundle: bundleData,
        case_worker: bundleData.case_worker,
        comments: bundleData.comments,
        history: bundleData.history,
        attachments: attachmentData === 404 ? [] : attachmentData
      }));
    } catch (err) {
      addMessage("danger", "Error retrieving data");
    }
  }

  tabHandler(e) {
    e.persist();
    this.setState(state => ({ currentTab: e.target.id }));
  }

  change(o, i) {
    this.setState(state => ({ associate: true }));
    document.getElementsByClassName("reactahead-input")[0].innertext = o;
    this.applicationChooser.clearInput();
    document.getElementById("associate").innerHTML = o;
    this.associateButton.current.id = o.split(" ")[0];
  }

  async updateBundle(e) {
    e.persist();
    const type = e.target.dataset.type;
    const body = { type: type };
    let successMessage = "";
    if (type === "associate" || type === "dissociate") {
      Object.assign(body, { applications: [e.target.id] });
      successMessage = `Application ${e.target.id} has been successfully ${type}d`;
      this.associateButton.current.id = null;
      document.getElementById("associate").innerHTML = "";
    } else {
      successMessage = `Bundle status successfully updated to ${type}`;
    }
    await apiCall(
      "PUT",
      "/bundles/" + this.props.match.params.id,
      JSON.stringify(body),
      true
    )
      .then(data => {
        if (!data) {
          addMessage("success", successMessage);
          this.fetchData();
        } else {
          addMessage("danger", "There was an error updating the bundle.");
        }
      })
      .catch(err => addMessage("danger", "Error retrieving data"));
  }

  render() {
    const {
      bundle,
      applications,
      case_worker,
      containerSticky,
      tabs,
      history,
      currentTab,
      states
    } = this.state;
    console.log(applications);
    if (authStore.token === "") {
      return <Redirect to="/" />;
    }
    const sidebarTop = "100";
    const sidebarComponent = () => {
      switch (currentTab) {
        case "comments":
          return <Comments entityType="bundles" entityID={bundle.id} />;
        case "attachments":
          return <Attachments entityType="bundles" />;
        default:
          return <History history={history} />;
      }
    };

    return (
      <div
        className={`bundles flex flex-wrap ${
          containerSticky ? "is-sticky" : ""
        }`}
      >
        <div className="bundleContainer w-70-l">
          <div className="title pb0 flex justify-start mv3 ml3">
            Bundle - {bundle.id}
          </div>
          <div className="bundle-meta flex">
            <div className="current-state">
              Current State:
              <b>{bundle.state}</b>
            </div>
            <div className="next-state">
              {bundle.state === "rejected" || bundle.state === "reported" ? (
                ""
              ) : (
                <div>
                  Mark the bundle as:{" "}
                  <div className="actions flex flex-column justify-between items-center ml4">
                    <button
                      type="button"
                      data-type={
                        states[
                          _.findIndex(
                            states,
                            state => bundle.state === state.label
                          ) + 1
                        ].action
                      }
                      onClick={this.updateBundle}
                    >
                      {
                        states[
                          _.findIndex(
                            states,
                            state => bundle.state === state.label
                          ) + 1
                        ].label
                      }
                    </button>
                    {bundle.state === "assessed" ? (
                      <button
                        className="mt2 rejected bg-red"
                        type="button"
                        data-type="reject"
                        onClick={this.updateBundle}
                      >
                        Rejected
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bundle-meta flex">
            <div className="case-worker">
              Case worker: <b>{case_worker.email}</b>
            </div>
            <div className="created">
              Created: <b>{moment(bundle.created_at).format("Do-MMM-YYYY")}</b>
            </div>
            <div className="created">
              Updated: <b>{moment(bundle.updated_at).format("Do-MMM-YYYY")}</b>
            </div>
          </div>
          <div className="bundle-applications">
            <div className="flex justify-between">
              <h1 className="mt4 ml3">
                Applications {` `}{" "}
                <span className="list-size">{_.size(bundle.applications)}</span>
              </h1>
              {bundle.state === "created" ? (
                <div className="associate-application">
                  <Reactahead
                    api={api => (this.applicationChooser = api)}
                    noResultMsg="Found no applications that match your search"
                    suggestions={applications}
                    onSubmit={this.change}
                    placeholder={`Search by application id`}
                  />
                  <div className="flex items-end mt3">
                    <span id="associate">&nbsp;</span>
                    <button
                      type="button"
                      data-type="associate"
                      id=""
                      className="ml3 flex"
                      ref={this.associateButton}
                      onClick={e => this.updateBundle(e)}
                    >
                      <i className="fa fa-plus mr2" />
                      associate
                    </button>
                  </div>
                </div>
              ) : (
                " "
              )}
            </div>
            <div className="flex flex-column">
              <div className="selected-header w-100 flex">
                <div className="text-center b">Id</div>
                <div className="text-center b">Applicant</div>
                <div className="text-center b">Actions</div>
              </div>
              {_.map(bundle.applications, (application, idx) => (
                <div className="selected-item w-100 flex" key={idx}>
                  <div className="id">{application.id}</div>
                  <div className="id">{application.applicant}</div>
                  <div className="id flex justify-center items-center">
                    <div
                      title="dissociate"
                      id={application.id}
                      data-type="dissociate"
                      onClick={e => this.updateBundle(e)}
                      className="pointer action mr3"
                    >
                      <i className="fa fa-trash red" />
                    </div>
                    <Link
                      title="view"
                      to={`/applications/${application.id}`}
                      className="action gray"
                    >
                      <i className="fa fa-eye" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sidebar w-30-l relative">
          <Sticky topOffset={100}>
            {({ style, isSticky, distanceFromTop = { sidebarTop } }) => (
              <div style={style}>
                <div className={`sidebar-content ${isSticky ? "sticky" : ""}`}>
                  {" "}
                  <div className="sidebar-tabs tabs flex justify-between">
                    {tabs.map((tab, idx) => (
                      <div
                        id={tab.title}
                        onClick={e => this.tabHandler(e)}
                        key={idx}
                        className={`tab tab-${tab.title} ${
                          currentTab === tab.title ? "active" : ""
                        }`}
                      >
                        <i className={`fa fa-${tab.icon}`} />
                        {tab.title}
                      </div>
                    ))}
                  </div>
                  <div className="sidebar-lists">{sidebarComponent()}</div>
                </div>
              </div>
            )}
          </Sticky>
        </div>
      </div>
    );
  }
}

export default view(Bundle);
