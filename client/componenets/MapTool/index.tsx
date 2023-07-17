import { useEffect, useState } from 'react';
import { useCmMap } from '../../hooks/useCmMap';
import styles from './index.module.scss';
export const MapTool = () => {
  const { map, setPeriod } = useCmMap();
  const [fromDt, setFromDt] = useState('');
  const [toDt, setToDt] = useState('');
  useEffect(() => {
    if (fromDt && toDt) {
      if (fromDt <= toDt) {
        setPeriod([fromDt, toDt]);
      }
    }
  }, [fromDt, toDt]);
  return (
    <div className={styles.tools}>
      <div>
        検索期間
        <div className={styles.dateBox}>
          <div className={styles.datePicker}>
            <label htmlFor="fromDate">開始日時</label>
            <input
              id="fromDate"
              type={'date'}
              value={fromDt}
              max={toDt}
              onChange={(e) => setFromDt(e.target.value)}
            />
          </div>
          <div className={styles.datePicker}>
            <label htmlFor="toDate">終了日時</label>
            <input
              id="toDate"
              type={'date'}
              value={toDt}
              min={fromDt}
              onChange={(e) => setToDt(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        ヒートマップの半径
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
