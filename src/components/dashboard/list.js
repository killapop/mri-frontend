import React from 'react';
import _ from 'lodash';
import ReactTable from 'react-table';
import { view } from 'react-easy-state';
import { authStore } from '../../lib/store';
import { listData } from '../../data/testData';
import './list.css';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionButtons: [
        { icon: 'trash', label: 'delete' },
        { icon: 'edit', label: 'edit' },
        { icon: 'eye', label: 'view' }
      ]
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    console.log(e.target.dataset.action, e.target.parentElement.id);
  }

  render() {
    const list =
      authStore.currentRole !== 'facilitator'
        ? 'myforms'
        : authStore.activeList === 'personalstatements' ||
          authStore.activeList === 'projectproposals'
          ? 'forms'
          : authStore.activeList;
    const addActions = {
      Header: 'Actions',
      accessor: 'id',
      filterable: false,
      sortable: false,
      Cell: row => (
        <div>
          <div id={row.row.id} className="actions">
            {_.map(this.state.actionButtons, (b, i) => (
              <i
                key={i}
                data-action={b.label}
                className={`fa fa-${b.icon} action pointer`}
                onClick={this.clickHandler}
              />
            ))}
          </div>
        </div>
      )
    };
    const newSchema = _.concat(listData[list].schema, addActions);
    return (
      <div className="lists w-80-ns center pa4">
        <ReactTable
          data={listData[list].data}
          columns={newSchema}
          className="-highlight"
          filterable={true}
        />
      </div>
    );
  }
}

export default view(List);
