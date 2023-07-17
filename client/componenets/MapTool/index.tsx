import { useEffect, useState } from 'react';
import { useCmMap } from '../../hooks/useCmMap';
import styles from './index.module.scss';
export const MapTool = () => {
  const { map, setPeriod, dayFilter } = useCmMap();
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
        曜日
        <div className={styles.days}>
          <span onClick={() => dayFilter.setValue(-1)}>なし</span>
          <span onClick={() => dayFilter.setValue(0)}>日</span>
          <span onClick={() => dayFilter.setValue(1)}>月</span>
          <span onClick={() => dayFilter.setValue(2)}>火</span>
          <span onClick={() => dayFilter.setValue(3)}>水</span>
          <span onClick={() => dayFilter.setValue(4)}>木</span>
          <span onClick={() => dayFilter.setValue(5)}>金</span>
          <span onClick={() => dayFilter.setValue(6)}>土</span>
        </div>
        <input
          value={dayFilter.value}
          onChange={(e) => dayFilter.setValue(Number(e.target.value))}
          type={'range'}
          min={-1}
          max={6}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: 20,
        }}
      >
        <div style={{ flex: 1 }}>
          ヒートマップの半径
          <input
            type={'range'}
            min={1}
            max={200}
            value={map.radius.value}
            onChange={(e) => map.radius.setValue(Number(e.target.value))}
          />
        </div>
        <div style={{ flex: 1 }}>
          ヒートマップの強さ
          <input
            type={'range'}
            min={1}
            max={5}
            value={map.weight.value}
            onChange={(e) => map.weight.setValue(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};
