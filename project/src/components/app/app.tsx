import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Header from '../../components/header/header';
import { Offer } from '../../types/offer';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { HelmetProvider } from 'react-helmet-async';

type AppProps = {
  offers: Offer[];
}

function App({offers}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main} element={<Header />} >
          <Route index element={<Main />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <Favorites offers={offers}/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Property} element={<Property />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path={AppRoute.Login} element={<Login />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
