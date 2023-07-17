import { FC } from 'react';
import { Remaining, useCmMap } from '../../hooks/useCmMap';
import styles from './index.module.scss';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';

export const SidePannel = () => {
  const { list } = useCmMap();
  return (
    <div className={styles.sidePannel}>
      <h4>選択中のデータ {(list?.length && `(${list.length}件)`) || ''}</h4>
      <div className={styles.pannelInner}>
        {list.map((item, index) => (
          <SingleData key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

const SingleData: FC<{ data: Remaining }> = ({ data }) => {
  const { setCenter } = useCmMap();
  const { address, count, latLng, name, date } = data;
  return (
    <div
      onClick={() => latLng && setCenter(latLng)}
      className={styles.singleRow}
    >
      <h4>
        {name}
        {count > 1 && `(${count})`}
        <small>
          {format(new Date(date), 'yyyy-MM-dd(E)', {
            locale: ja,
          })}
        </small>
      </h4>
      <p>{address}</p>
    </div>
  );
};
