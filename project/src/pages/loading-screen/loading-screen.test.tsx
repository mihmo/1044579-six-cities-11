import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import HistoryRouter from '../../components/history-route/history-route';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <LoadingScreen />
      </HistoryRouter>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
