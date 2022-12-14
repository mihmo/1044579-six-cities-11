import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import HistoryRouter from '../../components/history-route/history-route';
import FavoriteEmpty from './favorites-empty';

describe('Component: FavoriteEmpty', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <FavoriteEmpty />
      </HistoryRouter>,
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });
});
