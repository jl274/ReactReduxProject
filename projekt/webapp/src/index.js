import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './ducks/store';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Ładowanie...</div>}>
        <App />
      </Suspense>
    </Provider>   
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
