import { memo } from 'react';
import PlaceCard from '../../../components/place-card/place-card';
import Spinner from '../../../pages/loading-screen/spinner';
import { useAppSelector } from '../../../hooks';

function NearbyRooms(): JSX.Element {
  const serverNearbyOffers = useAppSelector((state) => state.serverNearbyOffers);
  const isNearbyOffersDataLoading = useAppSelector((state) => state.isNearbyOffersDataLoading);

  if (isNearbyOffersDataLoading) {
    const spinnerSize = {
      width: 1000,
      height: 424,
    };
    return (
      <section className="near-places places">
        <Spinner spinnerSize={[spinnerSize.height, spinnerSize.width]}/>
      </section>
    );
  }

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {serverNearbyOffers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(NearbyRooms);
