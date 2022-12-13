import { store } from '../store/index';
import { AuthorizationStatus } from '../consts';

export type UserProcess = {
  authStatus: AuthorizationStatus;
};
export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
