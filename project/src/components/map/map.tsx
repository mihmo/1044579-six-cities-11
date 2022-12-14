import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { memo } from 'react';
import { useParams } from 'react-router-dom';

import useMap from '../../hooks/use-map';
import { useAppSelector } from '../../hooks';

import { MapStyle } from '../../consts';
import { Offer } from '../../types/offer';
import { getRoomInfo } from '../../store/app-data/selectors';

const URL_MARKER_DEFAULT = '../../img/pin.svg';
const URL_MARKER_CURRENT = '../../img/pin-active.svg';

type MapProps = {
    selectedCard?: number;
    mapStyle: MapStyle;
    offers: Offer[];
  }

const defaultCustomIcon = new L.Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new L.Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({selectedCard, mapStyle, offers}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers);
  const {id} = useParams();
  const roomInfo = useAppSelector(getRoomInfo);
  const markerGroup = L.layerGroup();

  useEffect(() => {
    if (map) {
      markerGroup.addTo(map);
      offers.forEach((offer) => {
        const marker = new L.Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedCard !== undefined && offer.id === selectedCard && mapStyle === MapStyle.Main
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerGroup);
      });
      if (roomInfo && id) {
        const markerRoomInfo = new L.Marker({
          lat: roomInfo.location.latitude,
          lng: roomInfo.location.longitude
        });

        markerRoomInfo
          .setIcon(
            id && String(roomInfo.id) === id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerGroup);
      }

    }
    return () => {
      markerGroup.clearLayers();
    };
  }, [map, offers, selectedCard, mapStyle, markerGroup, roomInfo, id]);

  return <div className={mapStyle} ref={mapRef}></div>;
}

export default memo(Map);
