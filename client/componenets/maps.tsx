import { HeatmapLayerF } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import { useCmMap } from '../hooks/useCmMap';

export const TestMapCom = () => {
  const { list, map } = useCmMap();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    google.maps.importLibrary('geocoding').then(() => setLoaded(true));
  }, []);

  const geoLocations = useMemo(() => {
    if (list?.length && loaded) {
      const res = list.map((pool) => {
        pool.latLng = { lat: pool.latLng.lat, lng: pool.latLng.lng };
        return {
          location: new google.maps.LatLng(pool.latLng.lat, pool.latLng.lng),
          weight: 1 * map.weight.value,
        };
      });
      return res;
    } else {
      return [];
    }
  }, [list, loaded, setLoaded]);

  return geoLocations?.length ? (
    <HeatmapLayerF data={geoLocations} options={{ radius: map.radius.value }} />
  ) : null;
};
