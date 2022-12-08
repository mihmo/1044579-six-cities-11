import { useState } from 'react';
import OfferList from '../../components/offers-list/offers-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks';
import { MapStyle } from '../../consts';
import { Helmet } from 'react-helmet-async';

function Main(): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const [selectedCard, setActiveCard] = useState(0);
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 Cities - Main Page</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OfferList setActiveCard={setActiveCard} />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map">
                <Map
                  // offers={offers}
                  selectedCard={selectedCard}
                  mapStyle={MapStyle.Main}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
