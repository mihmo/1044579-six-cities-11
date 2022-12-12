/* eslint-disable no-console */
import { useState } from 'react';

import { NewComment } from '../../types/comment';
import { fetchPostCommentAction, fetchCommentsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';

const MIN_COMMENT_LENGTH = 50;

const CommntState = {
  comment: '',
  rating: 0,
};

function AddReviewForm(): JSX.Element {
  const [isEnableButton, setEnableButtnon] = useState(true);
  const [formData, setFormData] = useState<NewComment>(CommntState);

  const fieldChangeRatingHandle = (evt: { target: { value: NewComment[keyof NewComment]; name: string } }) => {
    const { name, value } = evt.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
    console.log(formData.comment, Number(formData.rating));


    if (formData.comment.length > MIN_COMMENT_LENGTH && Number(formData.rating) !== 0) {
      setEnableButtnon(false);
      console.log(formData.comment, Number(formData.rating));
    } else {
      setEnableButtnon(true);
    }
  };

  const fieldChangeHandle = (evt: { target: { value: NewComment[keyof NewComment]; name: string } }) => {
    const { name, value } = evt.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
    console.log(formData.comment, Number(formData.rating));


    if (formData.comment.length > MIN_COMMENT_LENGTH && Number(formData.rating) !== 0) {
      setEnableButtnon(false);
      console.log(formData.comment, Number(formData.rating));
    } else {
      setEnableButtnon(true);
    }
  };

  const dispatch = useAppDispatch();
  const addComment = (data: NewComment, id : string) => {
    dispatch(fetchPostCommentAction([data, id]));
    dispatch(fetchCommentsAction(id));
  };

  const handleSubmit = () => {
    addComment(formData, '29');
    setFormData(CommntState);
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review"></label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
          onChange={fieldChangeRatingHandle}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
          onChange={fieldChangeHandle}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
          onChange={fieldChangeHandle}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
          onChange={fieldChangeHandle}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
          onChange={fieldChangeHandle}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="comment" name="comment" placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={fieldChangeHandle}
        value={formData.comment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isEnableButton}
          onClick={
            (evt) => {
              evt.preventDefault();
              handleSubmit();
            }
          }
        >Submit
        </button>
      </div>
    </form>
  );
}

export default AddReviewForm;
