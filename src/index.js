import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';

const updateEndTime = (response) => {
  response.customData = response.customData || {};
  response.customData.time = new Date().getTime() - response.config.customData.startTime;
  return response;
};

// request interceptor
axios.interceptors.request.use(request => {
  request.customData = request.customData || {};
  request.customData.startTime = new Date().getTime();
  return request;
});
axios.interceptors.response.use(updateEndTime, e => {
  return Promise.reject(updateEndTime(e.response));
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


