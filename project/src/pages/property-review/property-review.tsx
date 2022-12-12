import AddReviewForm from './add-review-form';
import Review from './review';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../consts';

type RoomReviewProps = {
  id?: string;
};

function RoomReview(props: RoomReviewProps): JSX.Element {
  const comments = useAppSelector((state) => state.serverComments);
  const authStatus = useAppSelector((state) => state.authStatus);
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {comments.map((comment) => <Review comment={comment} key={comment.id}/>)}
      </ul>
      {authStatus === AuthorizationStatus.Auth &&
      <AddReviewForm id={props.id}/>}
    </section>
  );
}

export default RoomReview;
