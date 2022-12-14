import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import App from './components/app/app';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

import { store } from './store';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';

import { HelmetProvider } from 'react-helmet-async';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  // <React.StrictMode>

  <Provider store = {store}>
    <ToastContainer />
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </HelmetProvider>
  </Provider>

  // </React.StrictMode>,
);
