import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm, SubmitHandler } from 'react-hook-form';
import './login.css';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { AuthData } from '../../types/auth-data';
import { cities } from '../../consts';
import { loginAction } from '../../store/api-actions';

import { getAuthorization } from '../../store/user-process/selectors';

const PasswordRequirements = {
  MIN_LENGTH: 2,
  COUNT_NUMBERS: 1,
  COUNT_CHARS: 1,
};

function Login(): JSX.Element {
  const navigate = useNavigate();
  const isAuthorization = useAppSelector(getAuthorization);
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: {isSubmitSuccessful, isValid, errors}
  } = useForm<AuthData>({
    mode: 'onChange'
  });

  useEffect(() => {
    if (isAuthorization && isSubmitSuccessful){
      navigate('/');
      reset();
    }
  }, [formState, isAuthorization, isSubmitSuccessful, navigate, reset]);

  const dispatch = useAppDispatch();

  const onSubmit : SubmitHandler<AuthData> = (authData) => {
    dispatch(loginAction(authData));
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
      <header className="header">
        <Helmet>
          <title>6 cities  - Authorization</title>
        </Helmet>
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
              data-testid="form-submit"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  id="email"
                  placeholder="Email"
                  data-testid="login"
                  {...register('login', {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address'
                    }
                  })}
                  style={{marginBottom: 4}}
                />
                <div className='error'>{errors?.login?.message}</div>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                  data-testid="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: PasswordRequirements.MIN_LENGTH,
                      message: `Password must be at least ${PasswordRequirements.MIN_LENGTH} characters`,
                    },
                    pattern: {
                      value: /^.*(?=.{2,})(?=.*\d)(?=.*[a-zA-Z]).*$/i,
                      message: `Password must be at least ${PasswordRequirements.COUNT_CHARS} letter and ${PasswordRequirements.COUNT_NUMBERS} number`
                    }
                  })}
                  style={{marginBottom: 4}}
                />
                <div className='error'>{errors?.password?.message}</div>
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                data-testid="login-submit"
                disabled={!isValid}
              >Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item" data-testid="locations-login">
              {getRandomShowCityLink()}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
