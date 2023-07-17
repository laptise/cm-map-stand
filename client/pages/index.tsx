import { LoadScriptNext } from '@react-google-maps/api';
import { Map } from '../componenets/Map';
import { MapTool } from '../componenets/MapTool';
import { SidePannel } from '../componenets/SidePannel';
import { ToolBar } from '../componenets/ToolBar';
import { ContextProvider, useCmMap } from '../hooks/useCmMap';
import styles from './page.module.scss';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

export default function Home() {
  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}
      libraries={['visualization']}
    >
      <ContextProvider>
        <MapItem />
      </ContextProvider>
    </LoadScriptNext>
  );
}

const MapItem = () => {
  const { data, isLoading } = useQuery([], () =>
    axios.get<any[]>('/api').then(({ data }) => data),
  );
  const { setList, list } = useCmMap();
  useEffect(() => {
    if (data?.length) {
      setList(data);
    }
  }, [data, isLoading]);
  return (
    <>
      <ToolBar />
      <main className={styles.main}>
        <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
          <div style={{ height: 600, width: '100%', flex: 1 }}>
            <Map />
          </div>
          <SidePannel />
        </div>
        <MapTool />
      </main>
    </>
  );
};
