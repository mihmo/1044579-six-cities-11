import { store } from '../store/index';
import { AuthorizationStatus } from '../consts';
import { Offer } from './offer';
import { Comment } from './comment';

export type AppData = {
  offers: Offer[];
  offer: Offer;
  comments: Comment[];
  nearbyOffers: Offer[];
  favoriteOffers: Offer[];
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  isCommentsDataLoading: boolean;
  isNearbyOffersDataLoading: boolean;
  isFavoriteOffersDataLoading: boolean;
  isCommentPostStatus: boolean;
  isCommentSubmitSuccessful: boolean;
};

export type UserProcess = {
  authStatus: AuthorizationStatus;
  authUser: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
