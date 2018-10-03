import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { view } from 'react-easy-state';
import { authStore } from '../../lib/store';

class TestValues extends React.Component {
  render() {
    return (
      <div className="test-values pa0 form-group-inline fixed right-0 bottom-0 bt b--light-silver bg-gray white pv2 w-10 shadow-light">
        <div className="f6 ttu db pa2 mb2">Session Filters</div>
        {_.map(this.props.data, (filters, idx) => (
          <div
            className="form w-90 center mb2 pb2 bb b--light-silver"
            key={idx}>
            <div className="f7 ttu mb2">{filters.title}</div>
            {_.map(filters.states, (state, i) => (
              <div className="br0 b0" key={i}>
                <input
                  data-filtertype={filters.sessionItem}
                  id={state.toLowerCase().replace(' ', '')}
                  onChange={this.props.roleChangeHandler}
                  type="checkbox"
                  checked={
                    authStore.currentRole ===
                    state.toLowerCase().replace(' ', '')
                  }
                />
                <label
                  className="ml1 white"
                  style={{ fontWeight: 'normal' }}
                  htmlFor={state.toLowerCase().replace(' ', '')}>
                  {state}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

TestValues.propTypes = {
  data: PropTypes.array.isRequired,
  roleChangeHandler: PropTypes.func,
  filterType: PropTypes.string
};

export default view(TestValues);
