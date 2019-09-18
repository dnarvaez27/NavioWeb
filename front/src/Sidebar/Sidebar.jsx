import React from 'react';
import PropTypes from 'prop-types';
import './sidebar.css';
import { API } from '../settings';

export default class Sidebar extends React.Component {
  constructor (props) {
    super(props);
    this.state = { open: false, urls: [] };
  }

  componentDidMount () {
    (async () => {
      const req = await fetch(`${API}/api/urls`);
      const data = await req.json();

      this.setState({ urls: data });
    })();
  }

  dateToString (ts) {
    const pad = (num, len) => {
      return Array(len + 1 - num.toString().length).join('0') + num;
    };
    const d = new Date(ts);
    return `${d.getFullYear()}-${pad(d.getMonth(), 2)}-${pad(d.getDate(), 2)} ${pad(d.getHours(), 2)}:${pad(d.getMinutes(), 2)}:${pad(d.getSeconds(), 2)}`;
  }

  goToUrl (url) {
    return () => {
      this.props.goToUrl(url)();
      this.setState((prevState) => {
        return { open: false, urls: [{ url, timestamp: new Date().getTime() }, ...prevState.urls] };
      });
    };
  }

  addUrl (url) {
    this.setState((prevState) => {
      return { urls: [{ url, timestamp: new Date().getTime() }, ...prevState.urls] };
    });
  }

  render () {
    return (
      <>
        <button id="sidebar-opener" onClick={() => this.setState({ open: true })}>
          <i className="fas fa-bars"></i>
        </button>
        <div id="sidebar" className={this.state.open ? '' : 'hidden'}>
          <button onClick={() => this.setState({ open: false })}>
            <i className="fas fa-times"></i>
          </button>
          <div id="urls-container">
            {this.state.urls.sort((a, b) => b.timestamp - a.timestamp).map((u, i) => (
              <div className="url-item" onClick={this.goToUrl(u.url)} key={i}>
                <span>{u.url}</span>
                <span>{this.dateToString(u.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

Sidebar.propTypes = {
  goToUrl: PropTypes.func.isRequired
};
