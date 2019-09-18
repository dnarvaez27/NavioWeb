import React, { useState, useEffect } from 'react';
import './App.css';
import Navio from './Navio/Navio';
import Fetcher from './Fetcher/Fetcher';
import Sidebar from './Sidebar/Sidebar';
import { API } from './settings';

const App = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(undefined);
  const [toast, setToast] = useState({ show: false, text: '' });

  const input = { ref: React.createRef, value: '' };
  const fetchRef = React.createRef();
  let sidebarRef = React.createRef();

  useEffect(() => {
    if (fetchRef.current) {
      fetchRef.current.update(url);
    }
  }, [fetchRef, url]);

  useEffect(() => {
    if (toast.show) {
      setTimeout(() => setToast({ show: false, text: toast.text }), 2000);
    }
  }, [toast]);

  const saveUrl = (url) => {
    (async () => {
      await fetch(`${API}/api/urls`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url, timestamp: new Date().getTime() })
      });
    })();
  };
  const onFetchDone = (state, data) => {
    setUrl(undefined);
    setData(data);
  };
  const sendRequest = (addUrl = false) => {
    if (input.value) {
      setData(undefined);
      setUrl(input.value);
      saveUrl(input.value);
      if (addUrl) {
        sidebarRef.addUrl(input.value);
      }
    } else {
      setToast({ show: true, text: 'No URL typed' });
    }
  };

  const goToUrl = (url) => {
    return () => {
      input.value = url;
      sendRequest();
    };
  };

  return (
    <div className="App">
      <h1>Navio URL Dataset explorer</h1>
      <div id="header">
        <input
          ref={input.ref}
          onChange={e => (input.value = e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter') && sendRequest()}
          id="url-input"
        />
        <button onClick={() => { sendRequest(true); }}>Send</button>
      </div>
      <Sidebar goToUrl={goToUrl} ref={r => (sidebarRef = r)} />
      {url
        ? <Fetcher onFetchDone={onFetchDone} url={url} ref={fetchRef} />
        : (data && data.length) !== 0
          ? <Navio data={data} />
          : <div id="info-empty">
            <span>Enter a Dataset URL to visualize and explore it!</span>
          </div>
      }
      <div id="toast" className={toast.show ? 'shown' : ''}>{toast.text}</div>
    </div>
  );
};

export default App;
