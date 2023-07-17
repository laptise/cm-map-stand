import { useCmMap } from '../../hooks/useCmMap';
import styles from './index.module.scss';
export const MapTool = () => {
  const { map } = useCmMap();
  return (
    <div className={styles.tools}>
      <div>
        radius
        <input
          type={'range'}
          min={1}
          max={200}
          value={map.radius.value}
          onChange={(e) => map.radius.setValue(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
