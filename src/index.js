import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import '../semantic/dist/semantic.css';
import styles from './index.css';

import App from './components/App/App';
import store from './lib/store';

const root = document.createElement('root');
root.id = 'root';
document.body.appendChild(root);

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Component />
      </Router>
    </Provider>,
    root
  );
};

render(App);
