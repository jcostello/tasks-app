import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReducer'
import axios from 'axios';

axios.interceptors.request.use(config => {
  let token = localStorage.getItem('jwt')
  config.headers = Object.assign({
    Authentication: `Token ${token}`
  }, config.headers)
  return config
})

const store = createStore(rootReducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
