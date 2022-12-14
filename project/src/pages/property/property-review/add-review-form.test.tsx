import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import HistoryRouter from '../../../components/history-route/history-route';
import AddReviewForm from './add-review-form';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {isCommentSubmitSuccessful: false},
});

describe('Component: AddReviewForm', () => {
  it('1. should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewForm />
        </HistoryRouter>
      </Provider>

    );
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
