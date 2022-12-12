import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import NotFound from '../../pages/not-found/not-found';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';
import Header from '../../components/header/header';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { useAppSelector } from '../../hooks';
import { HelmetProvider } from 'react-helmet-async';

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const authStatus = useAppSelector((state) => state.authStatus);
  if (isOffersDataLoading || authStatus === AuthorizationStatus.Unknown) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main} element={<Header />} >
          <Route index element={<Main />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={authStatus}>
              <Favorites />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Property} element={<Property />} />
          <Route path={AppRoute.Error} element={<NotFound />} />
        </Route>
        <Route path={AppRoute.Login} element={<Login />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
