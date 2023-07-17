import { GoogleMap } from '@react-google-maps/api';
import { useCmMap } from '../../hooks/useCmMap';
import { TestMapCom } from '../maps';

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

export const Map = () => {
  const {
    map: { center },
  } = useCmMap();
  return (
    <GoogleMap
      center={center}
      mapContainerStyle={containerStyle}
      options={{ disableDefaultUI: true }}
      zoom={16}
    >
      <TestMapCom />
    </GoogleMap>
  );
};
