import { useParams } from 'react-router';
import { useEffect } from 'react';
import PropertyReviews from './property-review/property-reviews';
import NotFound from '../../pages/not-found/not-found';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import NearbyBlock from './nearby/nearby-block';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOfferAction, fetchNearbyOffersAction, fetchCommentsAction } from '../../store/api-actions';
import { getAuthCheckedStatus } from '../../store/user-process/selectors';
import { getOffersDataLoadingStatus, getOfferDataLoadingStatus, getServerOffers, getOffer } from '../../store/app-data/selectors';

function Property(): JSX.Element {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const isOfferDataLoading = useAppSelector(getOfferDataLoadingStatus);
  const serverOffers = useAppSelector(getServerOffers);
  const serverOffer = useAppSelector(getOffer);
  const {id} = useParams();
  const availableOffersIDs = [...new Set(serverOffers.map((offer) => offer.id.toString()))];
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
            {serverOffer.images.map((img) => (
              <div className="property__image-wrapper" key={img}>
                <img className="property__image" src={img} alt="Studio" />
              </div>)
            )}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {serverOffer.isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {serverOffer.title}
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
              <span className="property__rating-value rating__value">{serverOffer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {serverOffer.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {serverOffer.bedrooms}
              </li>
              <li className="property__feature property__feature--adults">
                Max {serverOffer.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{serverOffer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {serverOffer.goods.map((good) => <li key={good} className="property__inside-item">{good}</li>)}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={serverOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {serverOffer.host.name}
                </span>
                <span className="property__user-status">
                  {serverOffer.host.isPro}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {serverOffer.description}
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
