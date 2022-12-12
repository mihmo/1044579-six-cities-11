import { createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AuthorizationStatus, AppRoute } from '../consts';

export const changeSelectedCityAction = createAction('CHANGE_SELECTED_CITY', (city: string) => ({
  payload: city,
}));

export const pickOffersByCityAction = createAction('PICK_OFFERS_BY_CITY', (offers: Offer[], city: string) => {
  const offersByCity = offers.filter((offer) => offer.city.name === city);
  return {
    payload: offersByCity,
  };
});

export const sortByRatingAction = createAction('SORT_BY_RATING', (offersBySelectedCity : Offer[]) => {
  const offersSortedByRating = offersBySelectedCity.slice().sort((offerA, offerB) => offerB.rating - offerA.rating);
  return {
    payload: offersSortedByRating,
  };
});

export const sortByPriceLowToHighAction = createAction('SORT_BY_PRICE_LOW_TO_HIGH', (offersBySelectedCity : Offer[]) => {
  const offersSortedByPriceLowToHigh = offersBySelectedCity.slice().sort((offerA, offerB) => offerA.price - offerB.price);
  return {
    payload: offersSortedByPriceLowToHigh,
  };
});

export const sortByPriceHighToLowAction = createAction('SORT_BY_PRICE_HIGH_TO_LOW', (offersBySelectedCity : Offer[]) => {
  const offersSortedByPriceHighToLow = offersBySelectedCity.slice().sort((offerA, offerB) => offerB.price - offerA.price);
  return {
    payload: offersSortedByPriceHighToLow,
  };
});

export const loadOffersAction = createAction('LOAD_OFFERS', (serverOffers : Offer[]) => ({
  payload: serverOffers,
}));

export const requireAuthorizationAction = createAction('REQUIRE_AUTH', (authStatus : AuthorizationStatus) => ({
  payload: authStatus,
}));

export const setAuthUserAction = createAction('SET_AUTH_USER', (authUser : string ) => ({
  payload: authUser,
}));

export const setOffersDataLoadingStatusAction = createAction('SET_LOAD_STATUS', (isOffersDataLoading : boolean) => ({
  payload: isOffersDataLoading,
}));

export const redirectToRouteAction = createAction('REDIRECT_TO', (toRoute : AppRoute) => ({
  payload: toRoute,
}));
