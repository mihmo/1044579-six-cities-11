import { createAction} from '@reduxjs/toolkit';
import { AppRoute } from '../consts';

export const redirectToRouteAction = createAction('REDIRECT_TO', (toRoute : AppRoute) => ({
  payload: toRoute,
}));
