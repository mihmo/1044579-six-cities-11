import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';

import HistoryRouter from '../../../components/history-route/history-route';
import NearbyRooms from './nearby-rooms';

import {makeFakeNearbyOffers} from '../../../utils/mocks';
import {AuthorizationStatus} from '../../../consts';

const fakeNearbyOffers = makeFakeNearbyOffers();

const history = createMemoryHistory();

const mockStore = configureMockStore();

const store = mockStore({
  USER: {authStatus: AuthorizationStatus.NoAuth},
  DATA: {nearbyOffers: fakeNearbyOffers},
});

describe('Component: NearbyRooms', () => {
  it('1. should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NearbyRooms />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
