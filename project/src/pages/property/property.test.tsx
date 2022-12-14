import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';

import HistoryRouter from '../../components/history-route/history-route';
import Property from './property';
import { fakeRoomInfo, makeFakeNearbyOffers, makeFakeOffers, makeFakeComments } from '../../utils/mocks';
import { AuthorizationStatus, defaultCityInfo } from '../../consts';

const mockStore = configureMockStore([thunk]);

const fakeOffers = [...makeFakeOffers(), {...fakeRoomInfo, id: 1, defaultCityInfo}];
const fakeComments = makeFakeComments();
const fakeNearbyOffers = makeFakeNearbyOffers();

describe('Page: Property', () => {
  it('1. should render correctly all data received', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.NoAuth},
      DATA: {
        offers: fakeOffers,
        isOffersDataLoading: false,
        roomInfo: fakeRoomInfo,
        isRoomInfoDataLoading: false,
        comments: fakeComments,
        isCommentsDataLoading: false,
        nearbyOffers: fakeNearbyOffers,
        isNearbyOffersDataLoading: false,
      },
    });
    window.scrollTo = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Property />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
  it('2. should render correctly if offers and roomInfo is loading', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.NoAuth},
      DATA: {
        isOffersDataLoading: true,
        offers: [],
        isRoomInfoDataLoading: true,
        roomInfo: {},
      },
    });
    window.scrollTo = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Property />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
  it('3. should render correctly if comments and nearbyOffers is loading', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.NoAuth},
      DATA: {
        offers: fakeOffers,
        isOffersDataLoading: false,
        roomInfo: fakeRoomInfo,
        isRoomInfoDataLoading: false,
        comments: fakeComments,
        isCommentsDataLoading: true,
        nearbyOffers: fakeNearbyOffers,
        isNearbyOffersDataLoading: true,
      },
    });
    window.scrollTo = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Property />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    const spinnerBlocks = screen.queryAllByText(/Spinner/i);
    expect(spinnerBlocks[0]).toBeInTheDocument();
    expect(spinnerBlocks[1]).toBeInTheDocument();
  });

  it('4. should render correctly all data received and user Auth', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.Auth},
      DATA: {
        offers: fakeOffers,
        isOffersDataLoading: false,
        roomInfo: fakeRoomInfo,
        isRoomInfoDataLoading: false,
        comments: fakeComments,
        isCommentsDataLoading: false,
        nearbyOffers: fakeNearbyOffers,
        isNearbyOffersDataLoading: false,
      },
    });
    window.scrollTo = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Property />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
  it('5. should render correctly if user no Auth and click add to favorite', async () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.NoAuth},
      DATA: {
        offers: fakeOffers,
        isOffersDataLoading: false,
        roomInfo: fakeRoomInfo,
        isRoomInfoDataLoading: false,
        comments: fakeComments,
        isCommentsDataLoading: false,
        nearbyOffers: fakeNearbyOffers,
        isNearbyOffersDataLoading: true,
      },
    });
    window.scrollTo = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/'
              element={<Property />}
            />
            <Route
              path='/login'
              element={<h1>This is login page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByTestId('to-bookmarks')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('to-bookmarks'));
    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
  });

  it('6. should render correctly if user Auth and click add to favorite', async () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.NoAuth},
      DATA: {
        offers: fakeOffers,
        isOffersDataLoading: false,
        roomInfo: fakeRoomInfo,
        isRoomInfoDataLoading: false,
        comments: fakeComments,
        isCommentsDataLoading: false,
        nearbyOffers: fakeNearbyOffers,
        isNearbyOffersDataLoading: true,
      },
    });
    window.scrollTo = jest.fn();
    const fakeHandleFavorite = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Property />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByTestId('to-bookmarks')).toBeInTheDocument();
    screen.getByTestId('to-bookmarks').onclick = fakeHandleFavorite;
    await userEvent.click(screen.getByTestId('to-bookmarks'));
    expect(fakeHandleFavorite).toBeCalledTimes(1);
  });
});
