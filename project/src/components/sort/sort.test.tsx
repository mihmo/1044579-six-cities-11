import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import HistoryRouter from '../../components/history-route/history-route';
import Sort from './sort';
import { SortType } from '../../consts';

describe('Component: Sort', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    const fakeSortRef = {current: SortType.Popular};
    const fakeSortUlState = false;
    const fakeSetUlState = jest.fn();
    render(
      <HistoryRouter history={history}>
        <Sort sort={SortType.Popular} sortRef={fakeSortRef} sortUlState={fakeSortUlState} setUlState={fakeSetUlState}/>
      </HistoryRouter>
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });

});
