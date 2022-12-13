import { useState, useRef } from 'react';
import { useParams } from 'react-router';
import CitiesList from '../../components/cities-list/cities-list';
import Sort from '../../components/sort/sort';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import NotFound from '../../pages/not-found/not-found';
import { useAppSelector } from '../../hooks';
import { cities, MapStyle, SortType } from '../../consts';
import {getSortOffers} from '../../store/app-data/selectors';
import { Helmet } from 'react-helmet-async';

function Main(): JSX.Element {
  const [selectedCard, setActiveCard] = useState(0);
  const sortRef = useRef(SortType.Popular);
  const [sortUlState, setUlState] = useState(false);
  const {city} = useParams();
  const offers = useAppSelector((state) => getSortOffers(state, city, sortRef.current));

  if (city && !cities.includes(city)) {
    return <NotFound />;
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 Cities - Main Page</title>
      </Helmet>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList sortRef={sortRef} setUlState={setUlState} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length !== 0 && city ? `${offers.length} places to stay in ${city}` : 'No places to stay available'} </b>
              {offers.length !== 0 &&
              <Sort sort={sortRef.current} sortRef={sortRef} sortUlState={sortUlState} setUlState={setUlState}/>}
              <OffersList sort={sortRef.current} setActiveCard={setActiveCard} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map">
                {offers.length !== 0 &&
                <Map
                  offers={offers}
                  selectedCard={selectedCard}
                  mapStyle={MapStyle.Main}
                />}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
