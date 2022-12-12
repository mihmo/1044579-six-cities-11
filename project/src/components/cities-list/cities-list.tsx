import cn from 'classnames';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeSelectedCityAction, pickOffersByCityAction } from '../../store/action';
import { cities, SortType } from '../../consts';

type CitiesListProp = {
  sortRef: React.MutableRefObject<SortType>;
  setUlState: React.Dispatch<React.SetStateAction<boolean>>;
}

function CitiesList(props: CitiesListProp): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.serverOffers);
  const getLinkClassName = (city : string) =>
    cn(
      'locations__item-link tabs__item',
      {'tabs__item--active': city === selectedCity}
    );
  useEffect(() => {
    dispatch(pickOffersByCityAction(offers, selectedCity));
  }, [dispatch]);
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li
              key={city}
              className="locations__item"
            >
              <Link
                className={getLinkClassName(city)}
                to='#'
                onClick={() => {
                  dispatch(changeSelectedCityAction(city));
                  dispatch(pickOffersByCityAction(offers, city));
                  props.sortRef.current = SortType.Popular;
                  props.setUlState(false);
                }}
              >
                <span>{city}</span>
              </Link>
            </li>
          )
          )}
        </ul>
      </section>
    </div>
  );
}

export default memo(CitiesList);
