import { GoogleMap, LoadScript, LoadScriptNext } from '@react-google-maps/api';
import { Map } from '../componenets/Map';
import { MapTool } from '../componenets/MapTool';
import { SidePannel } from '../componenets/SidePannel';
import { ToolBar } from '../componenets/ToolBar';
import { ContextProvider, useCmMap } from '../hooks/useCmMap';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import config from 'next/config';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultProps = {
  center: {
    lat: 35.694287,
    lng: 139.7939672,
  },
  zoom: 14,
};
export default function Home() {
  return (
    <LoadScriptNext
      googleMapsApiKey={config().publicRuntimeConfig.googleApiKey}
      libraries={['visualization', 'geocoding']}
    >
      <ContextProvider>
        <MapItem />
      </ContextProvider>
    </LoadScriptNext>
  );
}

const MapItem = () => {
  const { setList, list, period, setLoading, map, dayFilter } = useCmMap();
  const from = period?.[0] || '';
  const to = period?.[1] || '';
  const { data, isLoading } = useQuery([from, to], () =>
    axios
      .get<any[]>('/api', from && to ? { params: { from, to } } : undefined)
      .then(({ data }) => data),
  );
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);
  useEffect(() => {
    if (data?.length !== undefined) {
      setList(
        data.filter((x) =>
          dayFilter.value === -1
            ? true
            : new Date(x.date).getDay() === dayFilter.value,
        ),
      );
    }
  }, [data, isLoading, dayFilter.value]);
  return (
    <>
      <ToolBar />
      <main>
        <GoogleMap
          center={map.center}
          mapContainerStyle={containerStyle}
          options={{ disableDefaultUI: true }}
          zoom={16}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          <Map />
        </GoogleMap>
        <SidePannel />
      </main>
      <MapTool />
    </>
  );
};
