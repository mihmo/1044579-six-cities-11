import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

export default function HeaderAuth(): JSX.Element {
  const dispatch = useAppDispatch();
  // const authUser = useAppSelector((state) => state.authUser);
  return (
    <>
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to="/favorites">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          {/* <span className="header__user-name user__name">{authUser}</span> */}
          <span className="header__favorite-count"></span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          className="header__nav-link"
          to="/"
          onClick={(evt) => {
            dispatch(logoutAction());
          }}
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}
