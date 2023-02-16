import styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.center}>
      <div className={styles.ldsDualRing}></div>
    </div>
  );
};
