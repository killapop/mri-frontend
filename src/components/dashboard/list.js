import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import { Link, Redirect, withRouter } from "react-router-dom";
import { view } from "react-easy-state";
import { authStore } from "../../lib/store";
import { listSchema } from "../../data/lists";
import { apiCall } from "../../lib/api-calls.js";

import "./list.css";

class FacilitatorList extends React.Component {
  state = {
    actionButtons: {
      activations: [{ icon: "ban", label: "invalidate" }],
      users: [
        { icon: "trash", label: "delete" },
        { icon: "key", label: "password" }
      ],
      applications: [
        { icon: "eye", label: "view" },
        { icon: "trash", label: "delete" }
      ],
      bundles: [
        { icon: "eye", label: "view" },
        { icon: "trash", label: "delete" }
      ]
    },
    activations: [],
    users: [],
    applications: [],
    projectProposals: [],
    personalStatements: [],
    bundles: []
  };

  async componentDidMount() {
    await this._getLists();
  }

  _getLists() {
    _.forEach(
      [
        "activations",
        "users",
        "projectProposals",
        "personalStatements",
        "bundles"
      ],
      k => {
        apiCall(
          "GET",
          "/" +
            (k === "personalStatements" || k === "projectProposals"
              ? "applications"
              : k),
          "",
          true
        ).then(data => {
          if (data === 401) {
            authStore.token = "";
            authStore.user = {};
            window.sessionStorage.clear();
          }
          this.setState(state => ({
            [k]:
              k === "personalStatements" || k === "projectProposals"
                ? _.filter(data, r => _.startsWith(r.form, k))
                : data,
            loaded: true
          }));
        });
      }
    );
  }

  clickHandler(e) {
    const { type, id, action } = e.target.dataset;
    const actionPath =
      (type === "applications" || type === "bundles") && action !== "delete"
        ? ""
        : "/" + action;
    const pathname = `/${type}${actionPath}/${id}`;
    this.setState(state => ({ redirect: pathname }));
  }

  render() {
    const { loaded, actionButtons, redirect } = this.state;
    const { list } = this.props;
    const path =
      list.slug === "personalStatements" || list.slug === "projectProposals"
        ? "applications"
        : list.slug;
    const customIDs = () => {
      if (path === "activations") {
        return "token";
      } else if (path === "users") {
        return "email";
      } else {
        return "id";
      }
    };
    const addActions = {
      Header: "Actions",
      accessor: customIDs(),
      filterable: false,
      sortable: false,
      Cell: row => (
        <div>
          <div id={row.row[customIDs()]} className="actions">
            {_.map(actionButtons[path], (b, i) => (
              <span key={i}>
                {path === "applications" ||
                (path === "applications" && b.label === "delete") ||
                (path === "activations" && row.row.isValid) ||
                path === "users" ||
                path === "bundles" ? (
                  <i
                    key={i}
                    data-action={b.label}
                    data-type={path === "activations" ? "users" : path}
                    data-id={row.row[customIDs()]}
                    data-data={row.row}
                    className={`fa fa-${b.icon} action pointer`}
                    onClick={e => this.clickHandler(e)}
                    title={b.label}
                  />
                ) : (
                  ""
                )}
              </span>
            ))}
          </div>
        </div>
      )
    };

    const newSchema = _.concat(listSchema[path], addActions);

    if (authStore.token === "") {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {redirect ? <Redirect to={redirect} /> : ""}
        {loaded === null ? (
          <div className="center">
            <h1>LOADING</h1>
          </div>
        ) : (
          <div>
            <div className="lists flex flex-column">
              <div className="flex justify-between">
                <h1>
                  {list.title} {` `}
                  <span className="list-size">
                    {_.size(this.state[list.slug]) || 0}
                  </span>
                </h1>
                {list.slug !== "activations" ? (
                  <Link
                    to={`/${path}/create${
                      list.slug === "projectProposals" ||
                      list.slug === "personalStatements"
                        ? "/" + list.slug
                        : ""
                    }`}
                    className="create pointer right ttu f6 b self-end pv2 ph3 white bg-primary-color mb2 ba b--very-ver-light link"
                  >
                    <i className="fa fa-plus-circle" /> Create
                  </Link>
                ) : (
                  ""
                )}
              </div>
              {_.size(this.state[list.slug]) > 0 ? (
                <ReactTable
                  data={this.state[list.slug]}
                  columns={newSchema}
                  filterable={true}
                  defaultPageSize={10}
                  className="-striped -highlight"
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id])
                      .toLowerCase()
                      .indexOf(filter.value.toLowerCase()) >= 0
                  }
                />
              ) : (
                <div className="text-center mt4 bt b--very-ver-light f4 pt3">
                  No {path} found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

FacilitatorList.propTypes = {
  list: PropTypes.object
};

export default withRouter(view(FacilitatorList));
