import { Link } from 'react-router-dom';

import Footer from '../../components/footer/footer';
import FavoritesCard from '../../components/favorites/favorites-card';
import FavoritesEmpty from '../../components/favorites/favorites-empty';

import { useAppSelector } from '../../hooks';
import { getFavoriteOffers } from '../../store/app-data/selectors';

import { Helmet } from 'react-helmet-async';

function Favorites(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const citiesFavoriteOffers = new Set(favoriteOffers?.map((offer) => offer.city.name));

  return (
    <>
      <Helmet>
        <title>6 Cities - Favorites</title>
      </Helmet>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffers.length === 0 && <FavoritesEmpty />}
          {favoriteOffers.length !== 0 &&
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {Array.from(citiesFavoriteOffers).map((city) =>(
              <li className="favorites__locations-items" key={city}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to={`/${city}`}>
                      <span>{city}</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  {favoriteOffers.map((offer) =>city === offer.city.name ? <FavoritesCard key={offer.id} offer={offer}/> : '' )}
                </div>
              </li>
            )
            )}
          </ul>
        </section>}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Favorites;
