import cn from 'classnames';
import { memo } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  sortByRatingAction,
  sortByPriceLowToHighAction,
  sortByPriceHighToLowAction,
  pickOffersByCityAction } from '../../store/action';
import { SortType } from '../../consts';

type SortProp = {
    sortRef: React.MutableRefObject<SortType>;
    sortUlState: boolean;
    setUlState: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sort({sortRef, sortUlState, setUlState} : SortProp): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers);
  const serverOffers = useAppSelector((state) => state.serverOffers);
  const city = useAppSelector((state) => state.city);
  const getSortActiveClassName = (sortType : SortType) =>
    cn(
      'places__option',
      {'places__option--active': sortRef.current === sortType}
    );

  return (
    <form className="places__sorting" action="#" method="get">
      {offers.length !== 0 &&
      <>
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          tabIndex={0}
          onClick={() => setUlState(true)}
        >
          {sortRef.current}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul
          className={cn(
            'places__options places__options--custom',
            {'places__options--opened': sortUlState}
          )}
        >
          <li
            className={getSortActiveClassName(SortType.Popular)}
            tabIndex={0}
            onClick={
              () => {
                dispatch(pickOffersByCityAction(serverOffers, city));
                sortRef.current = SortType.Popular;
                setUlState(false);
              }
            }
          >Popular
          </li>
          <li
            className={getSortActiveClassName(SortType.PriceLowToHigh)}
            tabIndex={0}
            onClick={
              () => {
                dispatch(sortByPriceLowToHighAction(offers));
                sortRef.current = SortType.PriceLowToHigh;
                setUlState(false);
              }
            }
          >Price: low to high
          </li>
          <li
            className={getSortActiveClassName(SortType.PriceHighToLow)}
            tabIndex={0}
            onClick={
              () => {
                dispatch(sortByPriceHighToLowAction(offers));
                sortRef.current = SortType.PriceHighToLow;
                setUlState(false);
              }
            }
          >Price: high to low
          </li>
          <li
            className={getSortActiveClassName(SortType.TopRatedFirst)}
            tabIndex={0}
            onClick={
              () => {
                dispatch(sortByRatingAction(offers));
                sortRef.current = SortType.TopRatedFirst;
                setUlState(false);
              }
            }
          >Top rated first
          </li>
        </ul>
      </>}
    </form>
  );
}

export default memo(Sort);
