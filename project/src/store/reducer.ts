import { createReducer } from '@reduxjs/toolkit';
import { changeSelectedCityAction, pickOffersByCityAction, sortByRatingAction, sortByPriceLowToHighAction, sortByPriceHighToLowAction } from './action';
import { Offer } from '../types/offer';

type State = {
  city: string;
  offers: Offer[];
}
const initialState: State = {
  city: 'Amsterdam',
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSelectedCityAction, (state, action) => {
      state.city = action.payload.city;
    })
    .addCase(pickOffersByCityAction, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(sortByRatingAction, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(sortByPriceLowToHighAction, (state, action) => {
      state.offers = action.payload.offers;
    })
    .addCase(sortByPriceHighToLowAction, (state, action) => {
      state.offers = action.payload.offers;
    });
});
