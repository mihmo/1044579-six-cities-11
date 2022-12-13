import cn from 'classnames';
import { memo } from 'react';
import { SortType } from '../../consts';

type SortProp = {
    sortRef: React.MutableRefObject<SortType>;
    sortUlState: boolean;
    setUlState: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sort({sortRef, sortUlState, setUlState} : SortProp): JSX.Element {
  const getSortActiveClassName = (sortType : SortType) =>
    cn(
      'places__option',
      {'places__option--active': sortRef.current === sortType}
    );

  return (
    <form className="places__sorting" action="#" method="get">
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
        {(Object.keys(SortType) as Array<keyof typeof SortType>).map((type) => (
          <li
            key={type}
            className={getSortActiveClassName(SortType[type])}
            tabIndex={0}
            onClick={
              () => {
                sortRef.current = SortType[type];
                setUlState(false);
              }
            }
          >{SortType[type]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default memo(Sort);
