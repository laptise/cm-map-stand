import { GoogleMap, LoadScript, LoadScriptNext } from '@react-google-maps/api';
import { Map } from '../componenets/Map';
import { MapTool } from '../componenets/MapTool';
import { SidePannel } from '../componenets/SidePannel';
import { ToolBar } from '../componenets/ToolBar';
import { ContextProvider, useCmMap } from '../hooks/useCmMap';
import styles from './page.module.scss';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

const containerStyle = {
  width: '100%',
  height: '86vh',
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
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}
      libraries={['visualization', 'geocoding']}
    >
      <ContextProvider>
        <MapItem />
      </ContextProvider>
    </LoadScriptNext>
  );
}

const MapItem = () => {
  const { setList, list, period, setLoading, map } = useCmMap();
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
      setList(data);
    }
  }, [data, isLoading]);
  return (
    <>
      <ToolBar />
      <main className={styles.main}>
        <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
          <div style={{ height: 600, width: '100%', flex: 1 }}>
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
          </div>
          <SidePannel />
        </div>
        <MapTool />
      </main>
    </>
  );
};
