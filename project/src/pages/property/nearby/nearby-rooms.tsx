import { memo } from 'react';
import PlaceCard from '../../../components/place-card/place-card';
import { useAppSelector } from '../../../hooks';
import { getNearbyOffers } from '../../../store/app-data/selectors';

function NearbyRooms(): JSX.Element {
  const nearbyOffers = useAppSelector(getNearbyOffers);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearbyOffers.map((offer) => (
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
