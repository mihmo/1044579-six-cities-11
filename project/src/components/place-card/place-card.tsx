import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Offer } from '../../types/offer';
import useFavorites from '../../hooks/use-favorites';

type PlaceCardProps = {
  offer: Offer;
  setActiveCard?: React.Dispatch<React.SetStateAction<number>>;
}

function PlaceCard({offer, setActiveCard}: PlaceCardProps): JSX.Element {

  const getFavoriteButtonClassName = () =>
    cn(
      'place-card__bookmark-button button',
      {'place-card__bookmark-button--active': offer.isFavorite}
    );

  return (
    <article
      onMouseOver={() => {setActiveCard && setActiveCard(offer.id);}}
      className="cities__card place-card"
      data-testid="card-article"
    >
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/${offer.city.name}/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={getFavoriteButtonClassName()}
            type="button"
            onClick={useFavorites(offer)}
            data-testid="to-bookmarks"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offer.rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/${offer.city.name}/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">[{offer.type}]</p>
      </div>
    </article>
  );
}

export default PlaceCard;
