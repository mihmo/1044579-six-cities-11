import { store } from '../store/index';
import { AuthorizationStatus } from '../consts';
import { Offer } from './offer';
import { Comment } from './comment';

export type AppData = {
  serverOffers: Offer[];
  offers: Offer[];
  serverOffer: Offer;
  serverComments: Comment[];
  serverNearbyOffers: Offer[];
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  isCommentsDataLoading: boolean;
  isNearbyOffersDataLoading: boolean;
  isCommentPostStatus: boolean;
  isCommentSubmitSuccessful: boolean;
};

export type UserProcess = {
  authStatus: AuthorizationStatus;
  authUser: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
