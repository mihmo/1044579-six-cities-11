import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

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
});
