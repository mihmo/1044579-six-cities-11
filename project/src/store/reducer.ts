import { createReducer } from '@reduxjs/toolkit';
import {
  changeSelectedCityAction,
  pickOffersByCityAction,
  sortByRatingAction,
  sortByPriceLowToHighAction,
  sortByPriceHighToLowAction,
  loadOffersAction,
  loadOfferAction,
  loadCommentsAction,
  loadNearbyOffersAction,
  setOffersDataLoadingStatusAction,
  setOfferDataLoadingStatusAction,
  setCommentsDataLoadingStatusAction,
  setNearbyOffersDataLoadingStatusAction,
  setAuthUserAction,
  setCommentPostStatusAction,
  setCommentSubmitAction} from './action';
import { Offer } from '../types/offer';
import { Comment } from '../types/comment';
import { AuthorizationStatus, AppRoute } from '../consts';

type State = {
  city?: string;
  offers: Offer[];
  serverOffers: Offer[];
  serverOffer: Offer;
  serverComments: Comment[];
  serverNearbyOffers: Offer[];
  authUser?: string;
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  isCommentsDataLoading: boolean;
  isNearbyOffersDataLoading: boolean;
  isCommentPostStatus: boolean;
  toRoute: AppRoute;
  isCommentSubmitSuccessful: boolean;
}
const initialState: State = {
  city: 'Amsterdam',
  offers: [],
  serverOffers: [],
  serverOffer: {
    bedrooms: 0,
    description: 'string',
    goods: ['string'],
    host: {
      avatarUrl: 'string',
      id: 0,
      isPro: false,
      name: 'string',
    },
    id: 0,
    images: ['string'],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
    maxAdults: 0,
    previewImage: 'string',
    price: 0,
    rating: 0,
    title: 'string',
    type: 'string',
    city: {
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
      },
      name: 'string',
    }
  },
  serverComments: [],
  serverNearbyOffers: [],
  isOffersDataLoading: false,
  isOfferDataLoading: false,
  isCommentsDataLoading: false,
  isNearbyOffersDataLoading: false,
  toRoute: AppRoute.Login,
  authUser: '',
  isCommentPostStatus: false,
  isCommentSubmitSuccessful: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSelectedCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(pickOffersByCityAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(sortByRatingAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(sortByPriceLowToHighAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(sortByPriceHighToLowAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffersAction, (state, action) => {
      state.serverOffers = action.payload;
    })
    .addCase(loadOfferAction, (state, action) => {
      state.serverOffer = action.payload;
    })
    .addCase(loadCommentsAction, (state, action) => {
      state.serverComments = action.payload;
    })
    .addCase(loadNearbyOffersAction, (state, action) => {
      state.serverNearbyOffers = action.payload;
    })
    .addCase(setOffersDataLoadingStatusAction, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatusAction, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(setCommentsDataLoadingStatusAction, (state, action) => {
      state.isCommentsDataLoading = action.payload;
    })
    .addCase(setNearbyOffersDataLoadingStatusAction, (state, action) => {
      state.isNearbyOffersDataLoading = action.payload;
    })
    .addCase(setCommentPostStatusAction, (state, action) => {
      state.isCommentPostStatus = action.payload;
    })
    .addCase(setCommentSubmitAction, (state, action) => {
      state.isCommentSubmitSuccessful = action.payload;
    })
    .addCase(setAuthUserAction, (state, action) => {
      state.authUser = action.payload;});
});
