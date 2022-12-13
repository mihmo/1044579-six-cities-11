import { NameSpace, SortType } from '../../consts';
import { State } from '../../types/state';
import { Offer } from '../../types/offer';
import { Comment } from '../../types/comment';

export const getServerOffers = (state: State): Offer[] => state[NameSpace.Data].serverOffers;
export const getOffersByCity = (state: State, city?: string): Offer[] => state[NameSpace.Data].serverOffers.filter((offer) => offer.city.name === city);
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getOffer = (state: State): Offer => state[NameSpace.Data].serverOffer;
export const getOfferDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOfferDataLoading;
export const getComments = (state: State): Comment[] => state[NameSpace.Data].serverComments;
export const getCommentsDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCommentsDataLoading;
export const getNearbyOffers = (state: State): Offer[]=> state[NameSpace.Data].serverNearbyOffers;
export const getNearbyOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isNearbyOffersDataLoading;
export const postComment = (state: State): Comment[]=> state[NameSpace.Data].serverComments;
export const getCommentPostStatus = (state: State): boolean => state[NameSpace.Data].isCommentPostStatus;
export const getCommentSubmitSuccessful = (state: State): boolean => state[NameSpace.Data].isCommentSubmitSuccessful;

export const getSortOffers = (state: State, sortType: SortType, city?: string): Offer[] => {
  const offers = getOffersByCity(state, city);
  switch (sortType) {
    case SortType.Popular:
      return offers;
    case SortType.PriceHighToLow:
      return offers.slice().sort((offerA, offerB) => offerB.price - offerA.price);
    case SortType.PriceLowToHigh:
      return offers.slice().sort((offerA, offerB) => offerA.price - offerB.price);
    case SortType.TopRatedFirst:
      return offers.slice().sort((offerA, offerB) => offerB.rating - offerA.rating);
    default:
      return offers;
  }
};
