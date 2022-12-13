import { memo, useEffect } from 'react';
import { useParams } from 'react-router';
import PlaceCard from '../../components/place-card/place-card';
import { SortType } from '../../consts';
import { getSortOffers } from '../../store/app-data/selectors';
import { useAppSelector } from '../../hooks';

type OfferListProps = {
  setActiveCard: React.Dispatch<React.SetStateAction<number>>;
  sort: SortType;
}

function OfferList({setActiveCard, sort}: OfferListProps): JSX.Element {
  const {city} = useParams();
  const offers = useAppSelector((state) => getSortOffers(state, city, sort));
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

export default memo(OfferList);
