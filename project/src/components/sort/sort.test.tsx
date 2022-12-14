import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

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

  it('2. should click to open sort list', async () => {
    const history = createMemoryHistory();
    const fakeSortRef = {current: SortType.Popular};
    const fakeSortUlState = false;
    const fakeSetUlState = jest.fn();
    const fakeHandleSortListClick = jest.fn();
    render(
      <HistoryRouter history={history}>
        <Sort sort={SortType.Popular} sortRef={fakeSortRef} sortUlState={fakeSortUlState} setUlState={fakeSetUlState}/>
      </HistoryRouter>
    );
    expect(screen.getByTestId('ul-sort')).toBeInTheDocument();
    screen.getByTestId('ul-sort').onclick = fakeHandleSortListClick;
    await userEvent.click(screen.getByTestId('ul-sort'));
    expect(fakeHandleSortListClick).toBeCalledTimes(1);
  });

  it('3. should click sort correctly', async () => {
    const history = createMemoryHistory();
    const fakeSortRef = {current: SortType.Popular};
    const fakeSortUlState = false;
    const fakeSetUlState = jest.fn();
    const fakeHandleSortClick = jest.fn();
    render(
      <HistoryRouter history={history}>
        <Sort sort={SortType.Popular} sortRef={fakeSortRef} sortUlState={fakeSortUlState} setUlState={fakeSetUlState}/>
      </HistoryRouter>
    );
    const randomLiSortClickEl = Math.floor(Math.random() * screen.getAllByTestId('li-sort').length);
    screen.getAllByTestId('li-sort')[randomLiSortClickEl].onclick = fakeHandleSortClick;
    await userEvent.click(screen.getAllByTestId('li-sort')[randomLiSortClickEl]);
    expect(fakeHandleSortClick).toBeCalledTimes(1);
  });

});
