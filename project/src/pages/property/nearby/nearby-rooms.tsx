import PlaceCard from '../../../components/place-card/place-card';
import { memo } from 'react';
import { useAppSelector } from '../../../hooks';

function NearbyRooms(): JSX.Element {
  const serverNearbyOffers = useAppSelector((state) => state.serverNearbyOffers);
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {serverNearbyOffers.map((offer) => (
          <PlaceCard
            // setActiveCard={setActiveCard}
            // TODO 2
            key={offer.id}
            offer={offer}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(NearbyRooms);