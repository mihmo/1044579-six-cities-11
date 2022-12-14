import { renderHook } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Map } from 'leaflet';

import useMap from './useMap';
import { makeFakeOffers } from '../utils/mocks';


const fakeOffers = makeFakeOffers();
const mockStore = configureMockStore([thunk]);

describe('Hook: useMap', () => {
  it('1. should return Map', () => {
    const store = mockStore({
      DATA: {offers: fakeOffers},
    });
    const target = document.createElement('div');
    document.body.appendChild(target);
    const ref = {
      current: target,
    };
    const { result } = renderHook(() => useMap(ref, fakeOffers), {
      wrapper: ({ children }) =><Provider store={store}>{children}</Provider>
    });

    const map = result.current;

    expect(map).toBeInstanceOf(Map);
  });



});
