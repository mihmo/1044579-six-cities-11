import {datatype} from 'faker';
import { appData } from './app-data';
import { fakeRoomInfo,
  makeFakeComment,
  makeFakeOffers,
  makeFakeNearbyOffers,
  makeFakeComments,
  makeFakeFavoriteOffers } from '../../utils/mocks';
import {
  fetchOffersAction,
  fetchRoomInfoAction,
  fetchCommentsAction,
  fetchNearbyOffersAction,
  fetchFavoriteOffersAction,
  fetchPostCommentAction,
  fetchPostOfferFavoriteStatusAction } from '../api-actions';

const fakeOffers = makeFakeOffers();
const fakeNearbyOffers = makeFakeNearbyOffers();
const fakeComments = makeFakeComments();
const fakeFavoriteOffers = makeFakeFavoriteOffers();
const fakeNewComment = makeFakeComment(datatype.number());

const initialState = {
  offers: [],
  roomInfo: {
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


describe('Reducer: appData', () => {
  it('1. without additional parameters should return initial state', () => {
    expect(appData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('2. should update offers by load offers', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: fakeOffers}))
      .toEqual({...state, offers: fakeOffers, isOffersDataLoading: false});
  });

  it('3. should update roomInfo by load roomInfo', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchRoomInfoAction.fulfilled.type, payload: fakeRoomInfo}))
      .toEqual({...state, roomInfo: fakeRoomInfo, isRoomInfoDataLoading: false});
  });

  it('4. should update nearbyOffers by load nearbyOffers', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchNearbyOffersAction.fulfilled.type, payload: fakeNearbyOffers}))
      .toEqual({...state, nearbyOffers: fakeNearbyOffers, isNearbyOffersDataLoading: false});
  });

  it('5. should update comments by load comments', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchCommentsAction.fulfilled.type, payload: fakeComments}))
      .toEqual({...state, comments: fakeComments, isCommentsDataLoading: false});
  });

  it('6. should update favoriteOffers by load favoriteOffers', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchFavoriteOffersAction.fulfilled.type, payload: fakeFavoriteOffers}))
      .toEqual({...state, favoriteOffers: fakeFavoriteOffers, isCommentsDataLoading: false});
  });

  it('7. should update comments before post comment', () => {
    const state = {...initialState, comments: fakeComments};
    const updateComments = fakeComments.slice();
    updateComments.push(fakeNewComment);
    expect(appData.reducer(state, {type: fetchPostCommentAction.fulfilled.type, payload: updateComments}))
      .toEqual({...state, comments: updateComments, isCommentPostStatus: false, isCommentSubmitSuccessful: true});
  });

  it('8. should update favoriteOffers, offers, roomInfo before post comment', () => {
    const state = {...initialState, roomInfo: fakeRoomInfo, offers: fakeOffers, nearbyOffers: fakeNearbyOffers};
    const favoriteOffer = {...fakeRoomInfo, isFavorite: !fakeRoomInfo.isFavorite};
    const updateOffers =
    fakeOffers.map((item) => {
      if (item.id !== favoriteOffer.id) {
        return item;
      }
      return {
        ...item,
        ...favoriteOffer
      };
    });
    const updateNearbyOffers =
    fakeNearbyOffers.map((item) => {
      if (item.id !== favoriteOffer.id) {
        return item;
      }
      return {
        ...item,
        ...favoriteOffer
      };
    });

    expect(appData.reducer(state, {type: fetchPostOfferFavoriteStatusAction.fulfilled.type, payload: favoriteOffer}))
      .toEqual({...state, roomInfo: favoriteOffer, isFavoriteOffersPostStatus: false, offers: updateOffers, nearbyOffers: updateNearbyOffers});
  });

  it('9. should set isCommentSubmitSuccessful flag if server is unavailable', () => {
    const state = initialState;
    expect(appData.reducer(state, {type: fetchPostCommentAction.rejected.type}))
      .toEqual({...state, isCommentSubmitSuccessful: false});
  });
});
