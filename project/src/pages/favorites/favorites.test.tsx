import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';import {Route, Routes} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import HistoryRouter from '../../components/history-route/history-route';
import Favorites from './favorites';
import { makeFakeFavoriteOffers } from '../../utils/mocks';
import { AuthorizationStatus } from '../../consts';

const mockStore = configureMockStore();

const fakeFavoriteOffers = makeFakeFavoriteOffers();

describe('Page: Favorites', () => {
  it('1. should render correctly if favoriteOffers empty', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {favoriteOffers: []},
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Favorites />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('2. should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.Auth},
      DATA: {favoriteOffers: fakeFavoriteOffers},
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Favorites />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('2. should following to link /city', async () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.Auth},
      DATA: {favoriteOffers: fakeFavoriteOffers},
    });
    const fakeCitiesFavoriteOffers = Array.from(new Set(fakeFavoriteOffers.map((offer) => offer.city.name)));
    const favoriteOffersCity = fakeCitiesFavoriteOffers[Math.floor(Math.random() * fakeCitiesFavoriteOffers.length)];
    const testLink = `/${favoriteOffersCity}`;
    history.push(testLink);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Favorites />
          <Routes>
            <Route
              path={testLink}
              element={<h1>This is main {favoriteOffersCity} page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>

    );
    await userEvent.click(screen.getByText(favoriteOffersCity));
    expect(screen.getByText(new RegExp(`This is main ${favoriteOffersCity} page`, 'i'))).toBeInTheDocument();

  });
});
