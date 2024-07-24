import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import rootReducer from './rootReducer';
import { createStore } from "redux";
import { Provider } from "react-redux";
const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <React.StrictMode>
     <Provider store={store}>
    <div id="background">
    <App/>
    </div>
    </Provider>
   
  </React.StrictMode>
  
);

reportWebVitals();
