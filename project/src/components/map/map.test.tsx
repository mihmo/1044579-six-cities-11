import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import HistoryRouter from '../history-route/history-route';
import Map from './map';

import { MapStyle } from '../../consts';
import { makeFakeOffers, fakeRoomInfo } from '../../utils/mocks';

const fakeOffers = makeFakeOffers();

const history = createMemoryHistory();

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {offers: fakeOffers, roomInfo: fakeRoomInfo},
});

describe('Component: Map', () => {
  it('1. should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Map offers={fakeOffers} selectedCard={fakeRoomInfo.id} mapStyle={MapStyle.Main}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText('OpenStreetMap')).toBeInTheDocument();
  });
});
