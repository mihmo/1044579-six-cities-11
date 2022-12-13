import { store } from '../store/index';
import { AuthorizationStatus, AppRoute } from '../consts';
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

export type AppProcess = {
  city?: string;
  toRoute: AppRoute;
};

export type UserProcess = {
  authStatus: AuthorizationStatus;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
