'use client';

import styles from './index.module.scss';
import { FC, useState } from 'react';
import { Remaining, useCmMap } from '../../hooks/useCmMap';

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
  return (
    <>
      <div className={styles.modalBody}></div>
      <div className={styles.backDrop} onClick={close} />
    </>
  );
};
