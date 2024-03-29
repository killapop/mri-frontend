import moment from "moment";
import _ from "lodash";
import React from "react";

const formatDate = (date) => moment(date).format("DD.MM.YYYY");

export const listSchemas = (t) => {
  return {
    activations: {
      columns: [
        {
          accessor: "email",
          Header: t("dashboard_columns_email"),
        },
        {
          accessor: "token",
          Header: t("dashboard_columns_token"),
        },
        {
          accessor: "password",
          Header: t("dashboard_columns_password"),
        },
        {
          accessor: "createAt",
          Header: t("dashboard_columns_created"),
          Cell: (row) => formatDate(row.value),
        },
        {
          accessor: "expiresAt",
          Header: t("dashboard_columns_expires"),
          Cell: (row) => formatDate(row.value),
        },
        {
          accessor: "isValid",
          Header: t("dashboard_columns_valid"),
          Cell: (row) => (
            <span style={{ color: row.value ? "#3a6" : "#a33" }}>
              <i
                className={`mr2 fa fa-15x fa-${row.value ? "check" : "times"}`}
              />
              {row.value ? "valid" : "not valid"}
            </span>
          ),
          filterMethod: (filter, row) => {
            if (filter.value !== "all") {
              return row[filter.id] === JSON.parse(filter.value);
            } else {
              return row;
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={(event) => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">Show All</option>
              <option value="true">Valid</option>
              <option value="false">Not Valid</option>
            </select>
          ),
        },
        {
          accessor: "isActive",
          Header: t("dashboard_columns_active"),
          Cell: (row) => (
            <span style={{ color: row.value ? "#3a6" : "#a33" }}>
              <i
                className={`mr2 fa fa-15x fa-${row.value ? "check" : "times"}`}
              />
              {row.value ? "active" : "inactive"}
            </span>
          ),
          filterMethod: (filter, row) => {
            if (filter.value !== "all") {
              return row[filter.id] === JSON.parse(filter.value);
            } else {
              return row;
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={(event) => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">Show All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          ),
        },
      ],
    },
    users: {
      columns: [
        {
          accessor: "email",
          Header: "Email",
        },
        {
          accessor: "name",
          Header: "Name",
        },
        {
          accessor: "roles",
          Header: "Roles",
          Cell: (row) => (
            <div>
              {_.map(row.value, (role, key) => {
                return (
                  <span
                    key={key}
                    className="mr2 br2 ph2 pv1 gray f6  bg-white shadow-light"
                  >
                    {role}
                  </span>
                );
              })}
            </div>
          ),
          filterMethod: (filter, row) => {
            if (filter.value !== "all") {
              if (_.includes(row.roles, filter.value)) {
                return row;
              }
            } else {
              return row;
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={(event) => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">Show All</option>
              <option value="mri-staff">mri-staff</option>
              <option value="organization">organization</option>
              <option value="beneficiary">beneficiary</option>
            </select>
          ),
        },
      ],
    },
    applications: {
      columns: [
        {
          accessor: "id",
          Header: "Application ID",
        },
        {
          accessor: "account.email",
          Header: "Applicant",
        },
        {
          accessor: "form",
          Header: "Program line",
          Cell: (row) => row.row.form.split("-").pop().charAt(0),
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return row;
            } else {
              return row.form.includes(filter.value);
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={(event) => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">Show All</option>
              <option value="1">Program line 1</option>
              <option value="2">Program line 2</option>
            </select>
          ),
        },
        {
          accessor: "state",
          Header: "Status",
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return row;
            } else {
              return row[filter.id] === filter.value;
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={(event) => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">Show All</option>
              <option value="created">Created</option>
              <option value="finalized">Finalized</option>
              <option value="locked">Locked</option>
            </select>
          ),
        },
        {
          accessor: "history[0].created_at",
          Header: "Last updated",
          filterable: false,
          Cell: (row) => (
            <React.Fragment>{formatDate(row.value)}</React.Fragment>
          ),
        },
        {
          accessor: "bundle",
          Header: "Bundled",
          Cell: (row) => (
            <span style={{ color: row.value ? "#3a6" : "#a33" }}>
              <i
                className={`mr2 fa fa-15x fa-${row.value ? "check" : "times"}`}
              />
              {row.value !== null ? "Bundled" : "Not bundled"}
            </span>
          ),
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return row;
            } else if (filter.value === "false") {
              return !row[filter.id];
            } else {
              return row[filter.id];
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={(event) => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">Show All</option>
              <option value="true">Bundled</option>
              <option value="false">Not bundled</option>
            </select>
          ),
        },
      ],
    },
    bundles: {
      columns: [
        {
          accessor: "id",
          Header: "Bundle ID",
        },
        {
          accessor: "case_worker.name",
          Header: "MRI contact",
        },
        {
          accessor: "applications",
          Header: "Applicants",
          Cell: (row) => (
            <div className="flex flex-wrap">
              {_.map(row.row.applications, (applicant, key) => {
                return (
                  <span
                    key={key}
                    className="mr2 br2 ph2 pv1 mv1 gray f6  bg-white shadow-light"
                  >
                    {applicant.applicant}
                  </span>
                );
              })}
            </div>
          ),
          filterMethod: (filter, row) => {
            return (
              _.toString(_.map(row.applications, "applicant")).indexOf(
                filter.value
              ) !== -1
            );
          },
        },
        {
          accessor: "created_at",
          Header: "Created",
          Cell: (row) => formatDate(row.value),
        },
        {
          accessor: "state",
          Header: "Status",
        },
      ],
    },
    userList: {
      columns: [
        {
          accessor: "created_on",
          Header: "Created",
        },
        {
          accessor: "updated_on",
          Header: "Updated",
        },
        {
          accessor: "state",
          Header: "Status",
        },
      ],
    },
  };
};
