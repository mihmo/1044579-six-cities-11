import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loadOffersAction,
  loadOfferAction,
  loadCommentsAction,
  loadNearbyOffersAction,
  requireAuthorizationAction,
  redirectToRouteAction,
  setAuthUserAction,
  setOffersDataLoadingStatusAction,
  setOfferDataLoadingStatusAction,
  setCommentsDataLoadingStatusAction,
  setNearbyOffersDataLoadingStatusAction,
  setCommentPostStatusAction } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, AppRoute } from '../consts';
import { AppDispatch, State } from '../types/state.js';
import { Offer } from '../types/offer';
import { Comment, NewComment } from '../types/comment';
import { AuthData, ResponseAuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatusAction(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatusAction(false));
    dispatch(loadOffersAction(data));
  },
);

export const fetchOfferAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    dispatch(setOfferDataLoadingStatusAction(true));
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const {data} = await api.get<Offer>(APIRoute.Offers + id);
    dispatch(setOfferDataLoadingStatusAction(false));
    dispatch(loadOfferAction(data));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (id, {dispatch, extra: api}) => {
    dispatch(setCommentsDataLoadingStatusAction(true));
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const {data} = await api.get<Comment[]>(APIRoute.Comments + id);
    dispatch(setCommentsDataLoadingStatusAction(false));
    dispatch(loadCommentsAction(data));
  },
);

export const fetchPostCommentAction = createAsyncThunk<void, [NewComment, string], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addComment',
  async ([{comment, rating}, id], {dispatch, extra: api}) => {
    dispatch(setCommentPostStatusAction(true));
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    await api.post<NewComment>(APIRoute.Comments, {comment, rating});
    dispatch(setCommentPostStatusAction(false));
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (id, {dispatch, extra: api}) => {
    dispatch(setNearbyOffersDataLoadingStatusAction(true));
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const {data} = await api.get<Offer[]>(APIRoute.Offers + id + APIRoute.NearbyOffers);
    dispatch(setNearbyOffersDataLoadingStatusAction(false));
    dispatch(loadNearbyOffersAction(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const res = await api.get<ResponseAuthData>(APIRoute.Login);
      dispatch(requireAuthorizationAction(AuthorizationStatus.Auth));
      dispatch(setAuthUserAction(res.data.email));
    } catch {
      dispatch(requireAuthorizationAction(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(requireAuthorizationAction(AuthorizationStatus.Auth));
      dispatch(setAuthUserAction(email));
      dispatch(redirectToRouteAction(AppRoute.Main));
    } catch {
      dispatch(requireAuthorizationAction(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorizationAction(AuthorizationStatus.NoAuth));
  },
);
