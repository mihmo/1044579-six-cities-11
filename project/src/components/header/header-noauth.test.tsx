import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';

import HistoryRouter from '../history-route/history-route';
import HeaderNoAuth from './header-noauth';

const history = createMemoryHistory();

describe('Component: HeaderNoAuth', () => {
  it('1. should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <HeaderNoAuth />
      </HistoryRouter>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('2. should click sign in correctly', async () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='/'
            element={<HeaderNoAuth />}
          />
          <Route
            path='/login'
            element={<h1>This is login page</h1>}
          />
        </Routes>
      </HistoryRouter>
    );
    expect(screen.getByTestId('link-sign-in')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('link-sign-in'));
    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
  });
});
