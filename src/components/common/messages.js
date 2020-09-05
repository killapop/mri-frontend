import React from "react";
// import PropTypes from "prop-types";
import Message from "./message";
import { view } from '@risingstack/react-easy-state';
import { messages } from "../../lib/store.js";

import "./messages.css";

class Messages extends React.Component {
  render() {
    return (
      <div>
        <ul className="notifications">
          {messages.messages.map((e, i) => (
            <Message key={i} message={e} />
          ))}
        </ul>
      </div>
    );
  }
}

Messages.propTypes = {
  // messages: PropTypes.array
};

export default view(Messages);
