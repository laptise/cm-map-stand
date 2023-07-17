import { LoadScriptNext } from '@react-google-maps/api';
import { Map } from '../componenets/Map';
import { MapTool } from '../componenets/MapTool';
import { SidePannel } from '../componenets/SidePannel';
import { ToolBar } from '../componenets/ToolBar';
import { ContextProvider } from '../hooks/useCmMap';
import styles from './page.module.scss';

export default function Home() {
  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}
      libraries={['visualization']}
    >
      <ContextProvider>
        <ToolBar />
        <main className={styles.main}>
          <MapTool />
          <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
            <div style={{ height: 600, width: '100%', flex: 1 }}>
              <Map />
            </div>
            <SidePannel />
          </div>
        </main>
      </ContextProvider>
    </LoadScriptNext>
  );
}
