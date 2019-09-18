import React from 'react';
import PropTypes from 'prop-types';
import './counter.css';

export default class Counter extends React.Component {
  constructor (props) {
    super(props);
    this.state = { count: 0, dataSize: 0 };
  }

  updateCount (count, dataSize) {
    this.setState({ count, dataSize });
  }

  render () {
    return (
      <div>
        <span>{`Loaded ${this.state.count} Pages`}</span>
        <span>{`We have reached ${this.state.dataSize} entries`}</span>
      </div>
    );
  }
}

Counter.propTypes = {
  limit: PropTypes.number.isRequired
};
