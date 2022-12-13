import { useParams } from 'react-router';
import { useEffect } from 'react';
import PropertyReviews from './property-review/property-reviews';
import NotFound from '../../pages/not-found/not-found';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import NearbyBlock from './nearby/nearby-block';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOfferAction, fetchNearbyOffersAction, fetchCommentsAction } from '../../store/api-actions';
import { getAuthCheckedStatus } from '../../store/user-process/selectors';
import { getOffersDataLoadingStatus, getOfferDataLoadingStatus, getOffers, getOffer } from '../../store/app-data/selectors';

function Property(): JSX.Element {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const isOfferDataLoading = useAppSelector(getOfferDataLoadingStatus);
  const offers = useAppSelector(getOffers);
  const offer = useAppSelector(getOffer);
  const {id} = useParams();
  const availableOffersIDs = [...new Set(offers.map((el) => el.id.toString()))];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferAction(id));
    dispatch(fetchNearbyOffersAction(id));
    dispatch(fetchCommentsAction(id));
    window.scrollTo(0, 0);
  }, [id]);

  if (id && !availableOffersIDs.includes(id)) {
    return <NotFound />;
  }

  if (isOfferDataLoading || isOffersDataLoading || !isAuthChecked) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images.map((img) => (
              <div className="property__image-wrapper" key={img}>
                <img className="property__image" src={img} alt="Studio" />
              </div>)
            )}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {offer.isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer.title}
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
              <span className="property__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer.bedrooms}
              </li>
              <li className="property__feature property__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods.map((good) => <li key={good} className="property__inside-item">{good}</li>)}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {offer.host.name}
                </span>
                <span className="property__user-status">
                  {offer.host.isPro}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {offer.description}
                </p>
              </div>
            </div>
            <PropertyReviews />
          </div>
        </div>
      </section>
      <NearbyBlock />
    </main>
  );
}

export default Property;
