import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { AppData } from '../../types/state';
import {
  fetchRoomInfoAction,
  fetchOffersAction,
  fetchCommentsAction,
  fetchNearbyOffersAction,
  fetchPostCommentAction,
  fetchFavoriteOffersAction,
  fetchPostOfferFavoriteStatusAction } from '../api-actions';

export const initialState: AppData = {
  offers: [],
  roomInfo: null,
  comments: [],
  nearbyOffers: [],
  favoriteOffers: [],
  isOffersDataLoading: false,
  isRoomInfoDataLoading: false,
  isCommentsDataLoading: false,
  isNearbyOffersDataLoading: false,
  isCommentPostStatus: false,
  isCommentSubmitSuccessful: false,
  isFavoriteOffersDataLoading: false,
  isFavoriteOffersPostStatus: false,
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
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchRoomInfoAction.pending, (state) => {
        state.isRoomInfoDataLoading = true;
      })
      .addCase(fetchRoomInfoAction.fulfilled, (state, action) => {
        state.roomInfo = action.payload;
        state.isRoomInfoDataLoading = false;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsDataLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isNearbyOffersDataLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isNearbyOffersDataLoading = false;
      })
      .addCase(fetchPostCommentAction.pending, (state) => {
        state.isCommentPostStatus = true;
      })
      .addCase(fetchPostCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentPostStatus = false;
        state.isCommentSubmitSuccessful = true;
      })
      .addCase(fetchPostCommentAction.rejected, (state) => {
        state.isCommentSubmitSuccessful = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isFavoriteOffersDataLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersDataLoading = false;
      })
      .addCase(fetchPostOfferFavoriteStatusAction.pending, (state) => {
        state.isFavoriteOffersPostStatus = true;
      })
      .addCase(fetchPostOfferFavoriteStatusAction.fulfilled, (state, action) => {
        const updateOffers = () => state.offers.map((item) => {
          if (item.id !== action.payload.id) {
            return item;
          }
          return {
            ...item,
            ...action.payload
          };
        });
        const updateNearbyOffers = () => state.nearbyOffers.map((item) => {
          if (item.id !== action.payload.id) {
            return item;
          }
          return {
            ...item,
            ...action.payload
          };
        });
        state.offers = updateOffers();
        state.roomInfo = action.payload;
        state.nearbyOffers = updateNearbyOffers();
        state.isFavoriteOffersPostStatus = false;
      });
  }
});
