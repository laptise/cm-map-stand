import { HeatmapLayerF } from '@react-google-maps/api';
import { FC, useEffect, useMemo, useState } from 'react';
import { Remaining, useCmMap } from '../hooks/useCmMap';

export const TestMapCom: FC<{
  geoLocations: { location: google.maps.LatLng; weight: number }[];
}> = ({ geoLocations }) => {
  const { map } = useCmMap();

  return geoLocations?.length ? <HeatmapLayerF data={geoLocations} /> : null;
};
