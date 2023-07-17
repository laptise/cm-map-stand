import { FC } from 'react';
import { Remaining, useCmMap } from '../../hooks/useCmMap';
import styles from './index.module.scss';
export const SidePannel = () => {
  const { list } = useCmMap();
  return (
    <div className={styles.sidePannel}>
      <h4>選択中のデータ {(list?.length && `(${list.length}件)`) || ''}</h4>
      {list.map((item, index) => (
        <SingleData key={index} data={item} />
      ))}
    </div>
  );
};

const SingleData: FC<{ data: Remaining }> = ({ data }) => {
  const { setCenter } = useCmMap();
  const { address, count, latLng, name } = data;
  return (
    <div
      onClick={() => latLng && setCenter(latLng)}
      className={styles.singleRow}
    >
      <h4>
        {name}
        {count > 1 && `(${count})`}
      </h4>
      <p>{address}</p>
    </div>
  );
};
