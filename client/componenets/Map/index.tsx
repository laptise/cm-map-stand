import { useGoogleMap } from '@react-google-maps/api';
import { useEffect, useMemo, useRef, useTransition } from 'react';
import { useCmMap } from '../../hooks/useCmMap';

export const Map = () => {
  const {
    loading,
    setLoading,
    list,
    dayFilter,
    map: { center, weight, radius },
  } = useCmMap();

  const map = useGoogleMap();

  const heatmapList = useMemo(() => {
    return (
      list.map((pool) => {
        pool.latLng = { lat: pool.latLng.lat, lng: pool.latLng.lng };
        return {
          location: new google.maps.LatLng(pool.latLng.lat, pool.latLng.lng),
          weight: (pool.count || 1) * weight.value,
        };
      }) || []
    );
  }, [list, weight.value]);

  const layer = useRef(new window.google.maps.visualization.HeatmapLayer());
  useEffect(() => {
    if (!loading) {
      const vs = layer.current;
      vs.setOptions({ radius: radius.value });
      vs.setData(heatmapList);
      if (!vs.getMap()) {
        vs.setMap(map);
      }
    }
  }, [heatmapList, radius.value, setLoading, loading]);

  return <></>;
};
