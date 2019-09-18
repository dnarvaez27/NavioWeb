import React from 'react';
import PropTypes from 'prop-types';
import navio from 'navio';
import './navio.css';

export default class Navio extends React.Component {
  constructor (props) {
    super(props);
    this.nRef = React.createRef();
  }

  componentDidMount () {
    this.nv = navio(this.nRef.current);
  }

  componentDidUpdate () {
    this.nv.data(this.props.data);
    this.nv.addAllAttribs();
  }

  render () {
    return (
      <div ref={this.nRef}></div>
    );
  }
}

Navio.propTypes = {
  data: PropTypes.any.isRequired
};
