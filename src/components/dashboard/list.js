import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortBy: '',
      sortOrder: 'asc',
    }
  }

  render() {
    return (
      <table className={`table ${this.props.title}`}>
        <thead>
          <tr>
            {_.map(this.props.data.columns, (column, idx) => (
              <th key={idx}>{column}</th>
            ))}
          </tr>
        </thead>
      </table>
    )
  }
}

List.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
}

export default List
