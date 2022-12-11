import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { sortByRatingAction, sortByPriceLowToHighAction, sortByPriceHighToLowAction, pickOffersByCityAction } from '../../store/action';
import { SortType } from '../../consts';

type SortProp = {
    sortRef: React.MutableRefObject<SortType>;
    sortUlState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

function Sort(props : SortProp): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.serverOffers);
  const city = useAppSelector((state) => state.city);
  const [ulState, setUlState] = props.sortUlState;
  const getSortActiveClassName = (sortType : SortType) =>
    cn(
      'places__option',
      {'places__option--active': props.sortRef.current === sortType}
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
          {props.sortRef.current}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul
          className={cn(
            'places__options places__options--custom',
            {'places__options--opened': ulState}
          )}
        >
          <li
            className={getSortActiveClassName(SortType.Popular)}
            tabIndex={0}
            onClick={
              () => {
                dispatch(pickOffersByCityAction(offers, city));
                props.sortRef.current = SortType.Popular;
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
                props.sortRef.current = SortType.PriceLowToHigh;
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
                props.sortRef.current = SortType.PriceHighToLow;
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
                props.sortRef.current = SortType.TopRatedFirst;
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

export default Sort;
