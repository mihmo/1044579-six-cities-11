import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../services/api';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchOffersAction,
  fetchRoomInfoAction,
  fetchCommentsAction,
  fetchNearbyOffersAction,
  fetchFavoriteOffersAction,
  fetchPostCommentAction,
  fetchPostOfferFavoriteStatusAction } from './api-actions';
import {redirectToRouteAction} from './action';

import {State} from '../types/state';
import {AuthData} from '../types/auth-data';

import {APIRoute, FavoriteStatus} from '../consts';
import {
  makeFakeOffers,
  makeFakeAuthUser,
  fakeRoomInfo,
  makeFakeComments,
  makeFakeNearbyOffers,
  makeFakeFavoriteOffers,
  makeFakeNewComment
} from '../utils/mocks';


const mockRoomInfo = fakeRoomInfo;
const mockComments = makeFakeComments();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('1. should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    const fakeUser = makeFakeAuthUser();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, fakeUser);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('2. should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRouteAction.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('', 'secret');
  });

  it('3. should dispatch offers when GET /offers', async () => {
    const mockOffers = makeFakeOffers();
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('4. should dispatch roomInfo when GET /offers/id', async () => {
    mockAPI
      .onGet(APIRoute.Offers + String(mockRoomInfo.id))
      .reply(200, mockRoomInfo);

    const store = mockStore();

    await store.dispatch(fetchRoomInfoAction(String(mockRoomInfo.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchRoomInfoAction.pending.type,
      fetchRoomInfoAction.fulfilled.type
    ]);
  });

  it('5. should dispatch comments when GET /comments/id', async () => {

    mockAPI
      .onGet(APIRoute.Comments + String(mockRoomInfo.id))
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(fetchCommentsAction(String(mockRoomInfo.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type
    ]);
  });

  it('6. should dispatch nearbyOffers when GET /offers/id/nearby/', async () => {
    const mockNearbyOffers = makeFakeNearbyOffers();
    mockAPI
      .onGet(APIRoute.Offers + String(mockRoomInfo.id) + APIRoute.NearbyOffers)
      .reply(200, mockNearbyOffers);

    const store = mockStore();

    await store.dispatch(fetchNearbyOffersAction(String(mockRoomInfo.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearbyOffersAction.pending.type,
      fetchNearbyOffersAction.fulfilled.type
    ]);
  });

  it('7. should dispatch favoriteOffers when GET /favorite/', async () => {
    const mockFavoriteOffers = makeFakeFavoriteOffers();
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockFavoriteOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoriteOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteOffersAction.pending.type,
      fetchFavoriteOffersAction.fulfilled.type
    ]);
  });

  it('8. should dispatch comments when POST newComent /comments/id/', async () => {
    const {comment, rating} = makeFakeNewComment();

    mockAPI
      .onPost(APIRoute.Comments + String(mockRoomInfo.id), {comment, rating})
      .reply(200, mockComments);


    const store = mockStore();

    await store.dispatch(fetchPostCommentAction([{comment, rating}, String(mockRoomInfo.id)]));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPostCommentAction.pending.type,
      fetchPostCommentAction.fulfilled.type
    ]);
  });

  it('9.1. should change offerFavoriteStatus when POST status: 1-add /favorite/id/1', async () => {
    const status = FavoriteStatus.Add;
    mockAPI
      .onPost(APIRoute.Favorite + String(mockRoomInfo.id) + status)
      .reply(200, mockRoomInfo);


    const store = mockStore();

    await store.dispatch(fetchPostOfferFavoriteStatusAction([String(mockRoomInfo.id), status]));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPostOfferFavoriteStatusAction.pending.type,
      fetchPostOfferFavoriteStatusAction.fulfilled.type
    ]);
  });

  it('9.2. should change offerFavoriteStatus when POST status: 0-dell /favorite/id/0', async () => {
    const status = FavoriteStatus.Del;
    mockAPI
      .onPost(APIRoute.Favorite + String(mockRoomInfo.id) + status)
      .reply(200, mockRoomInfo);


    const store = mockStore();

    await store.dispatch(fetchPostOfferFavoriteStatusAction([String(mockRoomInfo.id), status]));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPostOfferFavoriteStatusAction.pending.type,
      fetchPostOfferFavoriteStatusAction.fulfilled.type
    ]);
  });

  it('10. should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('');
  });
});
