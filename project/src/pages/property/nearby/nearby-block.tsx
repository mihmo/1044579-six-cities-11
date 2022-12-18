import { memo } from 'react';

import Map from '../../../components/map/map';
import NearbyRooms from './nearby-rooms';
import Spinner from '../../loading-screen/spinner';

import { useAppSelector } from '../../../hooks';

import { MapStyle } from '../../../consts';
import { getNearbyOffers, getNearbyOffersDataLoadingStatus } from '../../../store/app-data/selectors';

function NearbyBlock(): JSX.Element {
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const isNearbyOffersDataLoading = useAppSelector(getNearbyOffersDataLoadingStatus);

  if (isNearbyOffersDataLoading) {
    return (
      <section className="near-places places" data-testid='nearby-block-spinner'>
        <Spinner/>
      </section>
    );
  }

  return (
    <>
      <section className="property__map map" data-testid='nearby-block-map'>
        <Map
          offers={nearbyOffers}
          mapStyle={MapStyle.Room}
        />
      </section>
      <div className="container" data-testid='nearby-block-rooms'>
        <NearbyRooms />
      </div>
    </>
  );
}

export default memo(NearbyBlock);
