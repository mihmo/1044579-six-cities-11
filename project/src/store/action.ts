import { createAction} from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';

export const changeSelectedCityAction = createAction('CHANGE_SELECTED_CITY', (city: string) => ({
  payload: {
    city,
  },
}));

export const getOffersAction = createAction('GET_OFFERS', () => ({
  payload: {
    offers,
  },
}));
