import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';

import HistoryRouter from '../history-route/history-route';
import Header from './header';

import { AuthorizationStatus } from '../../consts';

const mockStore = configureMockStore();

const history = createMemoryHistory();

describe('Component: Header', () => {
  it('1. should render correctly if NoAuth ststus', () => {
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.NoAuth},
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <h1>No auth</h1>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/No auth/i)).toBeInTheDocument();
  });
  it('2. should render correctly if Auth ststus', () => {
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.Auth},
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <h1>Auth</h1>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Auth/i)).toBeInTheDocument();
  });

  it('3. should render correctly logo and following to main', async () => {
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.NoAuth},
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={<h1>This is main page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', '6 cities logo');
    await userEvent.click(screen.getByRole('img'));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();

  });
});
