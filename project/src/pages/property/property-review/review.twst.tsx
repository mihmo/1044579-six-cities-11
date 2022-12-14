import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import HistoryRouter from '../../../components/history-route/history-route';
import Review from './review';
import { AuthorizationStatus } from '../../../consts';
import { makeFakeComments } from '../../../utils/mocks';


const fakeComments = makeFakeComments();

const mockStore = configureMockStore();

const store = mockStore({
  USER: {authStatus: AuthorizationStatus.NoAuth},
  DATA: {comments: fakeComments},
});

describe('Component: Review', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    const comment = fakeComments[0];
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Review comment={comment}/>
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Reviews avatar');
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });
});
