import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { AppData } from '../../types/state';
import {
  fetchOfferAction,
  fetchOffersAction,
  fetchCommentsAction,
  fetchNearbyOffersAction,
  fetchPostCommentAction } from '../api-actions';

const initialState: AppData = {
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
  isCommentPostStatus: false,
  isCommentSubmitSuccessful: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.serverOffers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.serverOffer = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsDataLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.serverComments = action.payload;
        state.isCommentsDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isNearbyOffersDataLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.serverNearbyOffers = action.payload;
        state.isNearbyOffersDataLoading = false;
      })
      .addCase(fetchPostCommentAction.pending, (state) => {
        state.isCommentPostStatus = true;
      })
      .addCase(fetchPostCommentAction.fulfilled, (state, action) => {
        state.serverComments = action.payload;
        state.isCommentPostStatus = false;
        state.isCommentSubmitSuccessful = true;
      })
      .addCase(fetchPostCommentAction.rejected, (state) => {
        state.isCommentSubmitSuccessful = false;
      });
  }
});
