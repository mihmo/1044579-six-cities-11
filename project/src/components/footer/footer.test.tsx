import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import HistoryRouter from '../history-route/history-route';
import Footer from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('1. should render correctly and following to main', async () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
        <Routes>
          <Route
            path="/"
            element={<h1>This is main page</h1>}
          />
        </Routes>
      </HistoryRouter>
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', '6 cities logo');
    await userEvent.click(screen.getByRole('img'));
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();

  });
});
