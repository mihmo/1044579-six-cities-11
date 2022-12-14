import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import HistoryRouter from '../../components/history-route/history-route';
import Login from './login';

import { AuthorizationStatus, defaultCityInfo } from '../../consts';
import { fakeRoomInfo, makeFakeOffers } from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

const history = createMemoryHistory();

const fakeOffers = [...makeFakeOffers(), {...fakeRoomInfo, id: 1, city: {...defaultCityInfo}}];

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
  DAPA: {offers: fakeOffers}
});

describe('Component: Login', () => {
  it('1. should render correctly and type email/passwd', async () => {
    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Login />
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('login'), 'keks@mail.ru');
    await userEvent.type(screen.getByTestId('password'), '123456f');

    expect(screen.getByDisplayValue(/keks@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it('2. should click sign in correctly', async () => {
    const fakeSingIn = jest.fn();
    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Login />
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('login'), 'keks@mail.ru');
    await userEvent.type(screen.getByTestId('password'), '123456f');

    expect(screen.getByTestId('login-submit')).toBeInTheDocument();
    screen.getByTestId('form-submit').onsubmit = fakeSingIn;
    await userEvent.click(screen.getByTestId('login-submit'));
    expect(fakeSingIn).toBeCalledTimes(1);
  });

  it('3. should click /randomCity button correctly', async () => {
    const cities = fakeOffers.map((offer) => offer.city.name);
    const city = cities[Math.floor(Math.random() * cities.length)];
    const testLink = `/${city}`;
    history.push(testLink);
    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Login />
            <Routes>
              <Route
                path={testLink}
                element={<h1>This is main page {city}</h1>}
              />
            </Routes>
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );
    expect(screen.getByTestId('locations-login')).toBeInTheDocument();
    await userEvent.hover(screen.getByTestId('locations-login'));
    expect(screen.getByText(new RegExp(`This is main page ${city}`, 'i'))).toBeInTheDocument();
  });
});
