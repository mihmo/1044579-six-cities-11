import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction, fetchOffersAction } from '../../store/api-actions';
import { getFavoriteOffersCount, getFavoriteOffersPostStatus } from '../../store/app-data/selectors';
import { getAuthUser } from '../../store/user-process/selectors';
import { fetchFavoriteOffersAction } from '../../store/api-actions';

function HeaderAuth(): JSX.Element {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(getAuthUser);
  const isFavoriteOffersPostStatus = useAppSelector(getFavoriteOffersPostStatus);
  const favoriteOffersCount = useAppSelector(getFavoriteOffersCount);
  const signOut = () => {
    dispatch(logoutAction());
    dispatch(fetchOffersAction());
  };
  useEffect(() => {
    if (!isFavoriteOffersPostStatus) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [isFavoriteOffersPostStatus]);

  return (
    <>
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to="/favorites" data-testid="link-profile">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{authUser}</span>
          <span className="header__favorite-count">{favoriteOffersCount}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          className="header__nav-link"
          to="/"
          onClick={signOut}
          data-testid="link-sign-out"
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}

export default HeaderAuth;
