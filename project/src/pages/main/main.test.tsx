import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import HistoryRouter from '../../components/history-route/history-route';
import Main from './main';

import { fakeRoomInfo, makeFakeOffers } from '../../utils/mocks';
import { AuthorizationStatus, defaultCityInfo } from '../../consts';

const mockStore = configureMockStore([thunk]);

const fakeOffers = [...makeFakeOffers(), {...fakeRoomInfo, id: 1, city: {...defaultCityInfo}}];


describe('Page: Main', () => {
  it('1. should render correctly if data received and offers is empty', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.NoAuth},
      DATA: {
        offers: [],
        isOffersDataLoading: false,
      },
    });
    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Main />
          </HistoryRouter>
        </Provider>
      </HelmetProvider>

    );
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('2. should render correctly if data received', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.NoAuth},
      DATA: {
        offers: fakeOffers,
        isOffersDataLoading: false,
      },
    });
    const city = defaultCityInfo.name;
    const offersByCity = fakeOffers.filter((offer) => offer.city.name === city);
    const testLink = `/${city}`;
    history.push(testLink);

    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Routes>
              <Route path="/:city" element={<Main />} />
            </Routes>
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );
    expect(screen.getByText(new RegExp(`${offersByCity.length} places to stay in ${city}`, 'i'))).toBeInTheDocument();
  });
  it('3. should render if params is not correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.NoAuth},
      DATA: {
        offers: fakeOffers,
        isOffersDataLoading: false,
      },
    });
    const testLink = '/*';
    history.push(testLink);
    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Routes>
              <Route path="/:city" element={<Main />} />
            </Routes>
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );
    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
  });
});
