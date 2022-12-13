import PlaceCard from '../../components/place-card/place-card';
import { memo } from 'react';
import { useParams } from 'react-router';
import { useAppSelector } from '../../hooks';
import { getOffersByCity } from '../../store/app-data/selectors';

type OfferListProps = {
  setActiveCard: React.Dispatch<React.SetStateAction<number>>;
}

function OffersList({ setActiveCard }: OfferListProps): JSX.Element {
  const {city} = useParams();
  const offers = useAppSelector((state) => getOffersByCity(state, city));
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          setActiveCard={setActiveCard}
          key={offer.id}
          offer={offer}
        />
      ))}
    </div>
  );
}

export default memo(OffersList);
