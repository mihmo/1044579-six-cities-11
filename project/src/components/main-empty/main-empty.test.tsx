import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import HistoryRouter from '../../components/history-route/history-route';
import MainEmpty from './main-empty';

describe('Component: MainEmpty', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <MainEmpty />
      </HistoryRouter>,
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
