import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import store from './store';
// import { Provider } from 'react-redux';
// import { CookiesProvider } from 'react-cookie';

import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware , legacy_createStore as createStore } from 'redux';
import rootReducter from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';


const store = createStore(rootReducter, composeWithDevTools(applyMiddleware(thunk)));
// console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //     <App />
  // </React.StrictMode>
  
 
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <App/>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
