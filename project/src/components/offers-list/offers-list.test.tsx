import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import HistoryRouter from '../history-route/history-route';
import OfferList from './offers-list';
import { SortType } from '../../consts';


import {
  makeFakeOffers,
} from '../../utils/mocks';

const fakeOffers = makeFakeOffers();

const history = createMemoryHistory();

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {offers: fakeOffers},
});

describe('Component: OfferList', () => {
  it('1. should render correctly and following to main', () => {
    const fakeSetActiveCard = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferList sort={SortType.Popular} setActiveCard={fakeSetActiveCard}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByTestId('places-list')).toBeInTheDocument();

  });
});
