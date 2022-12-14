import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import { Route, Routes } from 'react-router-dom';

import HistoryRouter from '../history-route/history-route';
import HeaderAuth from './header-auth';

import { makeFakeAuthUser, makeFakeFavoriteOffers } from '../../utils/mocks';

const fakeAuthUser = makeFakeAuthUser();
const fakeFavoriteOffers = makeFakeFavoriteOffers();

const mockStore = configureMockStore([thunk]);

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
  });it('2. should click sign out correctly', async () => {

    const fakeHandleSignOut = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderAuth />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('link-sign-out')).toBeInTheDocument();
    screen.getByTestId('link-sign-out').onclick = fakeHandleSignOut;
    await userEvent.click(screen.getByTestId('link-sign-out'));
    expect(fakeHandleSignOut).toBeCalledTimes(1);
  });
  it('3. should click favorite profile correctly', async () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/'
              element={<HeaderAuth />}
            />
            <Route
              path='/favorites'
              element={<h1>This is favorites page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('link-profile')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('link-profile'));
    expect(screen.getByText(/This is favorites page/i)).toBeInTheDocument();
  });
});
