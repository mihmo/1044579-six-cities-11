import AddReviewForm from './add-review-form';
import Review from './review';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../consts';

type RoomReviewProps = {
  id?: string;
};

function RoomReview(props: RoomReviewProps): JSX.Element {
  const {serverComments, authStatus} = useAppSelector((state) => state);
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{serverComments.length}</span></h2>
      <ul className="reviews__list">
        {serverComments.map((comment) => <Review comment={comment} key={comment.id}/>)}
      </ul>
      {authStatus === AuthorizationStatus.Auth &&
      <AddReviewForm id={props.id}/>}
    </section>
  );
}

export default RoomReview;
