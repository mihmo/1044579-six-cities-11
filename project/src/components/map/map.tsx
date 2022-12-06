import { Offer, City } from '../../types/offer';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { MapStyle } from '../../consts';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const URL_MARKER_DEFAULT = '../../img/pin.svg';
const URL_MARKER_CURRENT = '../../img/pin-active.svg';

type MapProps = {
    offers: Offer[];
    city: City;
    selectedCard: number | undefined;
    mapStyle: MapStyle;
  }

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [30, 40],
  iconAnchor: [15, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [30, 40],
  iconAnchor: [15, 40]
});

function Map(props: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, props.city);

  useEffect(() => {
    if (map) {
      props.offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            props.selectedCard !== undefined && offer.id === props.selectedCard
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, props.offers, props.selectedCard]);

  return <div className={ props.mapStyle } ref={ mapRef }></div>;
}

export default Map;
