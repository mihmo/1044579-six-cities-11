import { memo } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import PlaceCard from '../../../components/place-card/place-card';
import { fetchNearbyOffersAction } from '../../../store/api-actions';
import { useAppSelector, useAppDispatch } from '../../../hooks';

function NearbyRooms(): JSX.Element {
  const serverNearbyOffers = useAppSelector((state) => state.serverNearbyOffers);
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchNearbyOffersAction(id));
  }, [dispatch, id]);
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
