/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
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
  setCommentPostStatusAction,
  setCommentSubmitAction, } from './action';
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
    dispatch(loadOffersAction(data));
    dispatch(setOffersDataLoadingStatusAction(false));
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
    const {data} = await api.get<Offer>(APIRoute.Offers + id);
    dispatch(loadOfferAction(data));
    dispatch(setOfferDataLoadingStatusAction(false));
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
    const {data} = await api.get<Comment[]>(APIRoute.Comments + id);
    dispatch(loadCommentsAction(data));
    dispatch(setCommentsDataLoadingStatusAction(false));
  },
);

export const fetchPostCommentAction = createAsyncThunk<void, [NewComment, string | undefined], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addComment',
  async ([{comment, rating}, id], {dispatch, extra: api}) => {
    try {
      dispatch(setCommentPostStatusAction(true));
      const {data} = await api.post<Comment[]>(APIRoute.Comments + id, {comment, rating});
      dispatch(setCommentPostStatusAction(false));
      dispatch(loadCommentsAction(data));
      dispatch(setCommentSubmitAction(true));
    } catch {
      dispatch(setCommentSubmitAction(false));
    }
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
    const {data} = await api.get<Offer[]>(APIRoute.Offers + id + APIRoute.NearbyOffers);
    dispatch(loadNearbyOffersAction(data));
    dispatch(setNearbyOffersDataLoadingStatusAction(false));
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
