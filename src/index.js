import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import store from './redux/store';

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ createBrowserHistory }>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
