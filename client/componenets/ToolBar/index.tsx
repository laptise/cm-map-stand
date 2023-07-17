'use client';

import styles from './index.module.scss';
import { FC, useState } from 'react';
import { Remaining, useCmMap } from '../../hooks/useCmMap';

const set1 = [
  new Remaining('東京都大東区両国１丁目', 3),
  new Remaining('東京都大東区両国２丁目', 1),
  new Remaining('東京都大東区両国３丁目', 1),
  new Remaining('東京都新宿区新小川町', 5),
];

const set2 = [
  new Remaining('東京都大東区両国１丁目', 1),
  new Remaining('両国国技館', 3),
];

export const ToolBar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const open = () => {
    setModalOpen(true);
  };

  const close = () => {
    setModalOpen(false);
  };

  return (
    <>
      <nav>
        <h1>ケアマネジャーマップ</h1>
        <button style={{ marginLeft: 'auto' }} onClick={open}>
          データ設定
        </button>
      </nav>
      {modalOpen && <Modal close={close} />}
    </>
  );
};

type Props = { close(): void };
const Modal: FC<Props> = ({ close }) => {
  const { setList } = useCmMap();
  const setData1 = () => {
    setList(set1);
    close();
  };
  const setData2 = () => {
    setList(set2);
    close();
  };
  return (
    <>
      <div className={styles.modalBody}>
        <button onClick={setData1}>data 1</button>
        <button onClick={setData2}>data 2</button>
      </div>
      <div className={styles.backDrop} onClick={close} />
    </>
  );
};
