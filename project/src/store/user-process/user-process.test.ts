import { userProcess } from './user-process';
import { UserProcess } from '../../types/state';
import { AuthorizationStatus } from '../../consts';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { makeFakeAuthUser } from '../../utils/mocks';

const fakeAuthUser = makeFakeAuthUser();

describe('Reducer: user', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {authStatus: AuthorizationStatus.Unknown, authUser: ''};
  });

  it('0. without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authStatus: AuthorizationStatus.Unknown, authUser: ''});
  });

  describe('1. checkAuthAction test', () => {
    it('1.1 should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type, payload:  fakeAuthUser}))
        .toEqual({authStatus: AuthorizationStatus.Auth, authUser: fakeAuthUser});
    });
    it('1.2. should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({authStatus: AuthorizationStatus.NoAuth, authUser: ''});
    });
  });

  describe('2. loginAction test', () => {
    it('2.1 should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginAction.fulfilled.type, payload:  fakeAuthUser }))
        .toEqual({authStatus: AuthorizationStatus.Auth, authUser: fakeAuthUser});
    });
    it('2.2 should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({authStatus: AuthorizationStatus.NoAuth, authUser: ''});
    });
  });

  describe('3. logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({authStatus: AuthorizationStatus.NoAuth, authUser: ''});
    });
  });
});
