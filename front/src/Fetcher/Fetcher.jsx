import React from 'react';
import PropTypes from 'prop-types';
import Counter from './Counter/Counter';

const limit = 1000;

export default class Fetcher extends React.Component {
  constructor (props) {
    super(props);
    this.counterRef = React.createRef();
  }

  update (url) {
    (async () => {
      let offset = 0;
      const extract = async (limit, offset) => {
        const req = await fetch(`${url}?$limit=${limit}&$offset=${offset}`);
        const data = await req.json();
        return data;
      };
      let data = [];
      let currentData = [0];
      let page = 1;

      const doExtract = () => {
        return new Promise((resolve, reject) => {
          setTimeout(async () => {
            currentData = await extract(limit, offset);
            if (Array.isArray(currentData)) {
              if (JSON.stringify(currentData) === JSON.stringify(data)) {
                currentData = [];
              }
              // eslint-disable-next-line require-atomic-updates
              offset += limit;
              data = [...data, ...currentData];
              this.counterRef.current.updateCount(page++, data.length);
              resolve();
            } else {
              reject(new Error('Data is not array'));
            }
          }, 100);
        });
      };

      while (currentData.length !== 0) {
        try {
          await doExtract();
        } catch (error) {
          console.error(error);
          break;
        }
      }
      this.props.onFetchDone(true, data);
    })();
  }

  render () {
    return (
      <div id="fetcher">
        <Counter ref={this.counterRef} limit={limit} />
      </div>
    );
  }
}

Fetcher.propTypes = {
  onFetchDone: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};
