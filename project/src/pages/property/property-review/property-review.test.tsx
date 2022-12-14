import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import HistoryRouter from '../../../components/history-route/history-route';
import PropertyReviews from './property-reviews';
import { makeFakeComments } from '../../../utils/mocks';
import { AuthorizationStatus } from '../../../consts';

const fakeComments = makeFakeComments();

const mockStore = configureMockStore();

describe('Component: PropertyReviews', () => {
  it('1. should render correctly if NoAuth', () => {
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.NoAuth},
      DATA: {comments: fakeComments},
    });
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyReviews />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('2. should render correctly if Auth', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.Auth},
      DATA: {comments: fakeComments},
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyReviews />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });
});
