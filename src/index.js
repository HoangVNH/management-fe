import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from 'react-router-dom';

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <App />
        </Router>
      </Suspense>  
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
