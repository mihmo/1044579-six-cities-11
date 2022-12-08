import { createReducer } from '@reduxjs/toolkit';
import { changeSelectedCityAction, pickOffersByCityAction } from './action';
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
    });
});
