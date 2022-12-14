import { Link } from 'react-router-dom';

function HeaderNoAuth(): JSX.Element {
  return (
    <li className="header__nav-item">
      <Link
        className="header__nav-link"
        to="/login"
        data-testid="link-sign-in"
      >
        <span className="header__signout">Sign in</span>
      </Link>
    </li>
  );
}

export default HeaderNoAuth;
