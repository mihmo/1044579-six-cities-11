import { useRef, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthData } from '../../types/auth-data';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorization } from '../../store/user-process/selectors';
import { cities } from '../../consts';
import { Helmet } from 'react-helmet-async';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const isAuthorization = useAppSelector(getAuthorization);

  useEffect(() => {
    if (isAuthorization){
      navigate('/');
    }
  }, []);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const getRandomShowCityLink = () => {
    const city = cities[Math.floor(Math.random() * cities.length)];
    return (
      <Link className="locations__item-link" to={`/${city}`}>
        <span>{city}</span>
      </Link>
    );
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 Cities - Login</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              {getRandomShowCityLink()}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
