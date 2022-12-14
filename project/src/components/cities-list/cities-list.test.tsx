import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import HistoryRouter from '../history-route/history-route';
import CitiesList from './cities-list';

import { SortType } from '../../consts';

const history = createMemoryHistory();

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const setUlState = jest.fn();
    render(
      <HistoryRouter history={history}>
        <CitiesList sort={SortType.Popular} setUlState={setUlState}/>
      </HistoryRouter>

    );

    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
  });
});
