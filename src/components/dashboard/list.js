import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import selectTableHOC from "react-table/lib/hoc/selectTable";
import { Link, Redirect, withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { view } from "@risingstack/react-easy-state";
import { authStore } from "../../lib/store";
import { listSchemas } from "../../data/lists";
import { apiCall } from "../../lib/api-calls.js";

import "./list.css";

const SelectTable = selectTableHOC(ReactTable);

class FacilitatorList extends React.Component {
  state = {
    activations: [],
    users: [],
    applications: [],
    projectProposals: [],
    personalStatements: [],
    bundles: [],
    selectAll: false,
    selection: [],
    filtered: [],
    filteredSize: 0,
  };

  async componentDidMount() {
    await this._getLists();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.list.slug === this.props.slug) {
      this.setState({ selection: [] });
    }
  }

  _getLists() {
    _.forEach(
      [
        "activations",
        "users",
        "projectProposals",
        "personalStatements",
        "bundles",
      ],
      (k) => {
        apiCall(
          "GET",
          "/" +
            (k === "personalStatements" || k === "projectProposals"
              ? "applications"
              : k),
          "",
          true
        ).then((data) => {
          if (data === 401) {
            authStore.token = "";
            authStore.user = {};
            window.sessionStorage.clear();
          }
          this.setState((state) => ({
            [k]:
              k === "personalStatements" || k === "projectProposals"
                ? _.filter(data, (r) => _.startsWith(r.form, k))
                : data,
            loaded: true,
            selection: [],
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
    this.setState((state) => ({ redirect: pathname }));
  }

  async export2Csv(e) {
    e.preventDefault();
    const path = `/${
      ["personalStatements", "projectProposals"].includes(this.props.list.slug)
        ? "applications"
        : this.props.list.slug
    }/csv`;
    const body = JSON.stringify({ ids: this.state.selection });
    await apiCall("POST", path, body, true, "csv").then((data) => {
      const element = document.createElement("a");
      const filename = `mri-${new Date()
        .toLocaleDateString("de-DE")
        .replace(/\./g, "")}`;
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(data)
      );
      element.setAttribute("download", `${filename}.csv`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  }

  toggleAll() {
    const selectAll = !this.state.selectAll;
    if (selectAll) {
      this.setState({
        selectAll,
        selection: _.map(
          this.resultsTable.wrappedInstance.getResolvedState().sortedData,
          "id"
        ),
      });
    } else {
      this.setState({ selectAll, selection: [] });
    }
  }

  toggleSelection(key, shift, row) {
    const s = this.state.selection;
    if (_.includes(s, key)) {
      _.pull(s, key);
    } else {
      s.push(key);
    }
    const selectAll =
      s.length ===
      (this.state.filteredSize === 0
        ? this.state[this.props.list.slug]
        : this.state.filteredSize);
    this.setState({ selection: s, selectAll });
  }

  render() {
    const { loaded, redirect, selectAll, selection } = this.state;
    const { list, t } = this.props;
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
    const actionButtons = {
      activations: [
        {
          icon: "ban",
          label: "invalidate",
          title: t("dashboard_actionButtons_invalidate"),
        },
      ],
      users: [
        {
          icon: "trash",
          label: "delete",
          title: t("dashboard_actionButtons_delete"),
        },
        {
          icon: "key",
          label: "password",
          title: t("dashboard_actionButtons_password"),
        },
      ],
      applications: [
        {
          icon: "eye",
          label: "view",
          title: t("dashboard_actionButtons_view"),
        },
        {
          icon: "trash",
          label: "delete",
          title: t("dashboard_actionButtons_delete"),
        },
      ],
      bundles: [
        {
          icon: "eye",
          label: "view",
          title: t("dashboard_actionButtons_view"),
        },
        {
          icon: "trash",
          label: "delete",
          title: t("dashboard_actionButtons_delete"),
        },
      ],
    };
    const addActions = {
      Header: t("dashboard_column_actions"),
      accessor: customIDs(),
      filterable: false,
      sortable: false,
      Cell: (row) => {
        return (
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
                      onClick={(e) => this.clickHandler(e)}
                      title={b.title}
                    />
                  ) : (
                    ""
                  )}
                </span>
              ))}
            </div>
          </div>
        );
      },
    };

    const listSchema = listSchemas(t);
    const newSchema = _.concat(listSchema[path], addActions);

    if (authStore.token === "") {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {redirect ? <Redirect to={redirect} /> : ""}
        {loaded === null ? (
          <div className="center">
            <h1>t('dashboard_loading')</h1>
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
                <div className="flex justify-end items-end">
                  {!["users", "activations"].includes(list.slug) ? (
                    <button
                      className="csv pointer right ttu f6 b self-end pv2 ph3 gray bg-light-gray mb2 mr2 ba b--silver link"
                      type="button"
                      onClick={(e) => this.export2Csv(e)}
                    >
                      {t("dashboard_button_export")}
                      <i className="fa fa-table ml2" />
                    </button>
                  ) : (
                    ""
                  )}
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
                      <i className="fa fa-plus-circle" />
                      {t("dashboard_button_create")}
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {_.size(this.state[list.slug]) > 0 ? (
                <SelectTable
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
                  keyField="id"
                  isSelected={(key) => _.includes(selection, key)}
                  selectAll={selectAll}
                  toggleAll={() => this.toggleAll()}
                  toggleSelection={(key, shift, row) =>
                    this.toggleSelection(key, shift, row)
                  }
                  selectType="checkbox"
                  ref={(r) => {
                    this.resultsTable = r;
                  }}
                />
              ) : (
                <div className="text-center mt4 bt b--very-ver-light f4 pt3">
                  {t("dashboard_no_found")}
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
  list: PropTypes.object,
};

export default withRouter(withTranslation()(view(FacilitatorList)));
