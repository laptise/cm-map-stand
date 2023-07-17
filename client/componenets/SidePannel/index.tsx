import { FC } from 'react';
import { Remaining, useCmMap } from '../../hooks/useCmMap';
import styles from './index.module.scss';
export const SidePannel = () => {
  const { list } = useCmMap();
  return (
    <div className={styles.sidePannel}>
      選択中のデータ {(list?.length && `(${list.length}件)`) || ''}
      {list.map((item, index) => (
        <SingleData key={index} data={item} />
      ))}
    </div>
  );
};

const SingleData: FC<{ data: Remaining }> = ({ data }) => {
  const { setCenter } = useCmMap();
  const { addr, count, latLng } = data;
  return (
    <div
      onClick={() => latLng && setCenter(latLng)}
      className={styles.singleRow}
    >
      {addr} {count}名
    </div>
  );
};
