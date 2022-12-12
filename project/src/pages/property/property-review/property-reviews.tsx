import { useParams } from 'react-router';
import { useEffect } from 'react';
import AddReviewForm from './add-review-form';
import Review from './review';
import { useAppSelector, useAppDispatch} from '../../../hooks';
import { fetchCommentsAction } from '../../../store/api-actions';
import { AuthorizationStatus } from '../../../consts';

function PropertyReviews(): JSX.Element {
  const {id} = useParams();
  const serverComments = useAppSelector((state) => state.serverComments);
  const authStatus = useAppSelector((state) => state.authStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCommentsAction(id));
  }, [id]);

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

export default PropertyReviews;
