import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Offer } from '../../types/offer';
import FavoriteCard from '../../components/favorite-card/favorite-card';

type FavoritesProps = {
  offers: Offer[];
}

function Favorites({ offers }: FavoritesProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const citiesFavoriteOffers = new Set(favoriteOffers.map((offer) => offer.city.name));
  return (
    <>
      <Helmet>
        <title>6 Cities - Favorites</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Array.from(citiesFavoriteOffers).map((city) =>(
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoriteOffers.map((offer) =>city === offer.city.name ? <FavoriteCard key={offer.id} offer={offer}/> : '' )}
                  </div>
                </li>
              )
              )}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Favorites;
