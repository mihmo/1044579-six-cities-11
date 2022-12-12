import { useState, useRef } from 'react';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { memo } from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import Sort from '../../components/sort/sort';
import { useAppSelector } from '../../hooks';
import { MapStyle, SortType } from '../../consts';
import { Helmet } from 'react-helmet-async';

function Main(): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const [selectedCard, setActiveCard] = useState(0);
  const sortRef = useRef(SortType.Popular);
  const [sortUlState, setUlState] = useState(false);
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
              <b className="places__found">{offers.length !== 0 ? `${offers.length} places to stay in ${city}` : 'No places to stay available'} </b>
              <Sort sortRef={sortRef} sortUlState={sortUlState} setUlState={setUlState}/>
              <OffersList setActiveCard={setActiveCard} />
              {/* TODO 1 */}
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

export default memo(Main);
