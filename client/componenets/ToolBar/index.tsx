import { FC, useState } from 'react';
import styles from './index.module.scss';

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
