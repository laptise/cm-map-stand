import { HeatmapLayer } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import { appConfig } from '../../app.config';
import { Remaining, useCmMap } from '../hooks/useCmMap';

const getLocationFromAddress = (
  geocoder: google.maps.Geocoder,
  address: string
) =>
  new Promise<google.maps.LatLngLiteral>((res, rej) => {
    geocoder.geocode({ address }, (r) => {
      if (r) res(r[0].geometry.location.toJSON());
      else rej();
    });
  });

export const TestMapCom = () => {
  const { list, map } = useCmMap();
  const [locs, setLocs] = useState<
    { latlng: google.maps.LatLng; count: number }[]
  >([]);

  const getLocationFromProps = async (list: Remaining[]) => {
    await google.maps.importLibrary('geocoding');
    const geocoder = new google.maps.Geocoder();
    const res = await Promise.all(
      list.map(async (pool) => {
        const loc = await getLocationFromAddress(geocoder, pool.addr);
        pool.latLng = { lat: loc.lat, lng: loc.lng };
        return {
          latlng: new google.maps.LatLng(loc.lat, loc.lng),
          count: pool.count,
        };
      })
    );
    setLocs(res);
  };

  useEffect(() => {
    getLocationFromProps(list);
  }, [list]);

  const heatmaps = useMemo(() => {
    return locs.map((loc) => ({
      location: loc.latlng,
      weight: loc.count * map.weight.value,
    }));
  }, [locs, map.weight.value]);

  return (
    <HeatmapLayer data={heatmaps} options={{ radius: map.radius.value }} />
  );
};
