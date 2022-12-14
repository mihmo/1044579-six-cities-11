import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';

import HistoryRouter from '../history-route/history-route';
import { AuthorizationStatus, AppRoute, defaultCityInfo } from '../../consts';
import App from './app';

import {
  makeFakeOffers,
  fakeRoomInfo,
  makeFakeComments,
  makeFakeNearbyOffers,
  makeFakeFavoriteOffers
} from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

const modFakeRoomInfo = {...fakeRoomInfo, id: 1, city: {...defaultCityInfo}};
const fakeOffers = [...makeFakeOffers(), {...modFakeRoomInfo}];
const fakeComments = makeFakeComments();
const fakeNearbyOffers = makeFakeNearbyOffers();
const fakeFavoriteOffers = makeFakeFavoriteOffers();

const store = mockStore({
  USER: {authStatus: AuthorizationStatus.NoAuth},
  DATA: {offers: fakeOffers, roomInfo: modFakeRoomInfo, comments: fakeComments, nearbyOffers: fakeNearbyOffers, favoriteOffers: fakeFavoriteOffers, isOffersDataLoading: false, isRoomInfoDataLoading: false},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('1. should render "Main" when user navigate to "/defaultCity" defaultCity=Paris', () => {
    history.push(`/${defaultCityInfo.name}`);

    render(fakeApp);

    expect(screen.getByText(/1 places to stay in Paris/i)).toBeInTheDocument();
  });

  it('2. should render "Login" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('3. should render "Room" when user navigate to "/:city/offer/:id"', () => {
    history.push('/Paris/offer/1');
    window.scrollTo = jest.fn();

    render(fakeApp);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('4. should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
