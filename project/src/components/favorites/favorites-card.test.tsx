import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';

import HistoryRouter from '../../components/history-route/history-route';
import FavoritesCard from './favorites-card';
import { fakeRoomInfo } from '../../utils/mocks';
import { AuthorizationStatus } from '../../consts';

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  USER: {authStatus: AuthorizationStatus.Auth},
  DATA: {roomInfo: fakeRoomInfo},
});

describe('Component: FavoritesCard', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesCard offer={fakeRoomInfo}/>
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
          <FavoritesCard offer={fakeRoomInfo}/>
          <Routes>
            <Route
              path={getTestLink}
              element={<h1>This is room page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.queryByText(/This is room page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('img'));
    expect(screen.getByText(/This is room page/i)).toBeInTheDocument();
  });

  it('3. should following to title link correctly', async () => {
    const history = createMemoryHistory();
    const getTestLink = `/${fakeRoomInfo.city.name}/offer/${fakeRoomInfo.id}`;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesCard offer={fakeRoomInfo}/>
          <Routes>
            <Route
              path={getTestLink}
              element={<h1>This is room page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.queryByText(/This is room page/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByText(fakeRoomInfo.title));
    expect(screen.getByText(/This is room page/i)).toBeInTheDocument();
  });

  it('4. should click button dell from favorite', async () => {
    const history = createMemoryHistory();
    const fakeHandleFavorite = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesCard offer={fakeRoomInfo}/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('to-bookmarks')).toBeInTheDocument();
    screen.getByTestId('to-bookmarks').onclick = fakeHandleFavorite;
    await userEvent.click(screen.getByTestId('to-bookmarks'));
    expect(fakeHandleFavorite).toBeCalledTimes(1);
  });
});
