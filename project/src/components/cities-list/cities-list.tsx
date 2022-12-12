import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import cn from 'classnames';
import { memo } from 'react';
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeSelectedCityAction, pickOffersByCityAction } from '../../store/action';
import { cities, SortType } from '../../consts';

type CitiesListProp = {
  sortRef: React.MutableRefObject<SortType>;
  setUlState: React.Dispatch<React.SetStateAction<boolean>>;
}

function CitiesList(props: CitiesListProp): JSX.Element {
  const dispatch = useAppDispatch();
  const {city} = useParams();
  const offers = useAppSelector((state) => state.serverOffers);
  const getLinkClassName = (linkCity : string) =>
    cn(
      'locations__item-link tabs__item',
      {'tabs__item--active': linkCity === city}
    );

  const getOffers = () => {
    dispatch(changeSelectedCityAction(city));
    dispatch(pickOffersByCityAction(offers, city));
    props.sortRef.current = SortType.Popular;
    props.setUlState(false);
  };

  useEffect(() => {
    dispatch(changeSelectedCityAction(city));
    dispatch(pickOffersByCityAction(offers, city));
  }, [dispatch, city]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((el) => (
            <li
              key={el}
              className="locations__item"
            >
              <Link
                className={getLinkClassName(el)}
                to={`/${el}`}
                onClick={() => getOffers}
              >
                <span>{el}</span>
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
