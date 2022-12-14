import { renderHook } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as router from 'react-router';
import * as redux from '../hooks';

import useFavorites from './use-favorites';

import {fakeRoomInfo} from '../utils/mocks';
import {AuthorizationStatus} from '../consts';


const mockStore = configureMockStore([thunk]);

describe('Hook: useFavorite', () => {
  it('1. should return function', () => {
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.NoAuth},
      DATA: {roomInfo: fakeRoomInfo},
    });

    const mockedNavigate = jest.fn();
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedNavigate);
    const {result} = renderHook(() => useFavorites(fakeRoomInfo), {
      wrapper: ({children}) =><Provider store={store}>{children}</Provider>
    });

    const handleFavorite = result.current;

    expect(handleFavorite).toBeInstanceOf(Function);
  });

  it('2. should navigate if no Auth', () => {
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.NoAuth},
      DATA: {roomInfo: fakeRoomInfo},
    });

    const mockedNavigate = jest.fn();
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedNavigate);
    const {result} = renderHook(() => useFavorites(fakeRoomInfo), {
      wrapper: ({children}) =><Provider store={store}>{children}</Provider>
    });

    result.current();
    expect(mockedNavigate).toBeCalledTimes(1);
  });

  it('3. should  change isFavorite', () => {
    const fakeRoomInfoFavoriteIsFalse = {...fakeRoomInfo, isFavorite: false};
    const store = mockStore({
      USER: {authStatus: AuthorizationStatus.Auth},
      DATA: {roomInfo: fakeRoomInfoFavoriteIsFalse},
    });

    const mockedNavigate = jest.fn();
    const mockedDispatch = jest.fn();
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedNavigate);
    const useDispatchSpy = jest.spyOn(redux , 'useAppDispatch');
    useDispatchSpy.mockReturnValue(mockedDispatch);
    const {result} = renderHook(() => useFavorites(fakeRoomInfoFavoriteIsFalse), {
      wrapper: ({children}) =><Provider store={store}>{children}</Provider>
    });

    result.current();
    expect(mockedNavigate).toBeCalledTimes(0);
    expect(mockedDispatch).toBeCalledTimes(1);
  });

});
