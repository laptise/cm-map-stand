import {
  GoogleMap,
  useGoogleMap,
  HeatmapLayer,
  HeatmapLayerF,
} from '@react-google-maps/api';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useCmMap } from '../../hooks/useCmMap';
import { TestMapCom } from '../maps';

export const Map = () => {
  const {
    loading,
    setLoading,
    list,
    map: { center, weight, radius },
  } = useCmMap();
  const [isPending, startTransition] = useTransition();

  const map = useGoogleMap();

  const geoLocations = useMemo(() => {
    return list.map((pool) => {
      pool.latLng = { lat: pool.latLng.lat, lng: pool.latLng.lng };
      return {
        location: new google.maps.LatLng(pool.latLng.lat, pool.latLng.lng),
        weight: 1 * weight.value,
      };
    });
  }, [list]);
  const layer = useRef(new window.google.maps.visualization.HeatmapLayer());
  useEffect(() => {
    const geo = geoLocations || [];
    const vs = layer.current;
    vs.setOptions({ radius: radius.value });
    vs.setData(geo);
    const currentMap = vs.getMap();
    if (!currentMap) {
      vs.setMap(map);
    }
  }, [geoLocations, radius, setLoading]);

  return <></>;
};
