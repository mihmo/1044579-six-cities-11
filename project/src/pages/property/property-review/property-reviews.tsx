import AddReviewForm from './add-review-form';
import Review from './review';
import { memo } from 'react';
import Spinner from '../../../pages/loading-screen/spinner';
import { useAppSelector} from '../../../hooks';
import { AuthorizationStatus } from '../../../consts';
import { getComments, getCommentsDataLoadingStatus } from '../../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../../store/user-process/selectors';

function PropertyReviews(): JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const serverComments = useAppSelector(getComments);
  const isCommentsDataLoading = useAppSelector(getCommentsDataLoadingStatus);

  if (isCommentsDataLoading) {
    const spinnerSize = {
      height: 158.4,
    };
    return (
      <section className="property__reviews reviews">
        <Spinner spinnerSize={[spinnerSize.height]}/>
      </section>
    );
  }

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{serverComments.length}</span></h2>
      <ul className="reviews__list">
        {serverComments.map((comment) => <li className="reviews__item" key={comment.id}><Review comment={comment}/></li>)}
      </ul>
      {authStatus === AuthorizationStatus.Auth &&
      <AddReviewForm />}
    </section>
  );
}

export default memo(PropertyReviews);
