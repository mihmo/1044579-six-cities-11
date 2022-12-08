import { useAppSelector } from '../../hooks';
import PlaceCard from '../../components/place-card/place-card';

type OfferListProps = {
  setActiveCard: React.Dispatch<React.SetStateAction<number>>;
}

function OfferList({ setActiveCard }: OfferListProps): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
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

export default OfferList;
