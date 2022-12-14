import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';

import HistoryRouter from '../../components/history-route/history-route';
import PlaceCard from './place-card';
import { fakeRoomInfo } from '../../utils/mocks';
import { AuthorizationStatus } from '../../consts';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {authStatus: AuthorizationStatus.NoAuth},
  DATA: {roomInfo: fakeRoomInfo},
});

describe('Component: PlaceCard', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard offer={fakeRoomInfo}/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Place image');
    expect(screen.getByText(/night/i)).toBeInTheDocument();
  });

  it('2. should following to img link correctly', async () => {
    const history = createMemoryHistory();
    const getTestLink = `/${fakeRoomInfo.city.name}/offer/${fakeRoomInfo.id}`;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard offer={fakeRoomInfo}/>
          <Routes>
            <Route
              path={getTestLink}
              element={<h1>This is room page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );
    await userEvent.click(screen.getByRole('img'));
    expect(screen.getByText(/This is room page/i)).toBeInTheDocument();
  });

  it('3. should following to title link correctly', async () => {
    const history = createMemoryHistory();
    const getTestLink = `/${fakeRoomInfo.city.name}/offer/${fakeRoomInfo.id}`;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard offer={fakeRoomInfo}/>
          <Routes>
            <Route
              path={getTestLink}
              element={<h1>This is room page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );
    await userEvent.click(screen.getByText(fakeRoomInfo.title));
    expect(screen.getByText(/This is room page/i)).toBeInTheDocument();
  });
});
