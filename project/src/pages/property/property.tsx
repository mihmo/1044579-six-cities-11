import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import PropertyReview from '../property-review/property-review';
import Map from '../../components/map/map';
import PlaceCard from '../../components/place-card/place-card';
import NotFound from '../../pages/not-found/not-found';
import { MapStyle } from '../../consts';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOfferAction, fetchCommentsAction, fetchNearbyOffersAction } from '../../store/api-actions';

function Property(): JSX.Element {
  const [selectedCard, setActiveCard] = useState(0);
  const { id } = useParams();
  const availableOffersIDs = [...new Set(useAppSelector((state) => state.serverOffers).map((offer) => offer.id.toString()))];
  const dispatch = useAppDispatch();
  const roomInfo = useAppSelector((state) => state.serverOffer);
  const NearbyOffers = useAppSelector((state) => state.serverNearbyOffers);

  useEffect(() => {
    dispatch(fetchOfferAction(id));
    dispatch(fetchCommentsAction(id));
    dispatch(fetchNearbyOffersAction(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  if (id && !availableOffersIDs.includes(id)) {
    return <NotFound />;
  }

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {roomInfo.images.map((img) =>(
              <div className="property__image-wrapper" key={img}>
                <img className="property__image" src={img} alt="Studio" />
              </div>)
            )}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {roomInfo.isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {roomInfo.title}
              </h1>
              <button className="property__bookmark-button button" type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{ width: '80%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{roomInfo.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {roomInfo.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {roomInfo.bedrooms}
              </li>
              <li className="property__feature property__feature--adults">
                Max {roomInfo.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{roomInfo.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {roomInfo.goods.map((good) => <li key={good} className="property__inside-item">{good}</li>)}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={roomInfo.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {roomInfo.host.name}
                </span>
                <span className="property__user-status">
                  {roomInfo.host.isPro}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {roomInfo.description}
                </p>
              </div>
            </div>
            <PropertyReview id={id}/>
          </div>
        </div>
        <section className="property__map map">
          <Map
            offers={NearbyOffers}
            selectedCard={selectedCard}
            mapStyle={MapStyle.Room}
          />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {NearbyOffers.map((offer) => (
              <PlaceCard
                setActiveCard={setActiveCard}
                key={offer.id}
                offer={offer}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Property;
