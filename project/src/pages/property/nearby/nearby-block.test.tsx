import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import HistoryRouter from '../../../components/history-route/history-route';
import NearbyBlock from './nearby-block';

import { makeFakeNearbyOffers } from '../../../utils/mocks';
import { AuthorizationStatus } from '../../../consts';

const fakeNearbyOffers = makeFakeNearbyOffers();

const history = createMemoryHistory();

const mockStore = configureMockStore();

describe('Component: NearbyBlock', () => {
  it('1. should render correctly', () => {
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.NoAuth},
      DATA: {nearbyOffers: fakeNearbyOffers},
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NearbyBlock />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByTestId('nearby-block-map')).toBeInTheDocument();
    expect(screen.getByTestId('nearby-block-rooms')).toBeInTheDocument();
  });

  it('2. should render correctly if isNearbyOffersDataLoading', () => {
    const store = mockStore({
      DATA: {isNearbyOffersDataLoading: true},
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NearbyBlock />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByTestId('nearby-block-spinner')).toBeInTheDocument();
  });

});
