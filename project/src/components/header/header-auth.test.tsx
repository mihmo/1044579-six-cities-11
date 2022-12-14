import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

import HistoryRouter from '../history-route/history-route';
import HeaderAuth from './header-auth';
import { makeFakeAuthUser, makeFakeFavoriteOffers } from '../../utils/mocks';

const fakeAuthUser = makeFakeAuthUser();
const fakeFavoriteOffers = makeFakeFavoriteOffers();

const mockStore = configureMockStore();

const history = createMemoryHistory();

const store = mockStore({
  USER: {authUser: fakeAuthUser},
  DATA: {isFavoriteOffersPostStatus: true, favoriteOffers: fakeFavoriteOffers},
});

describe('Component: HeaderAuth', () => {
  it('1. should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderAuth />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(new RegExp(`${fakeAuthUser}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
  });
});
