import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from './components/app/app';
import { store } from './store';
import { offers } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = {store}>
        <App
          offers = {offers}
        />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
