import AddReviewForm from './add-review-form';
import Review from './review';
import { comments } from '../../mocks/comments';

type RoomReviewProps = {
  id: string | undefined;
}

function RoomReview(props: RoomReviewProps): JSX.Element {
  const loadComments = comments.slice(Number(props.id));
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{loadComments.length}</span></h2>
      <ul className="reviews__list">
        {loadComments.map((comment) => <Review comment={comment} key={comment.id}/>)}
      </ul>
      <AddReviewForm/>
    </section>
  );
}

export default RoomReview;
