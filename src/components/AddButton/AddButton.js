import React from 'react';
import styles from './AddButton.module.scss';
import plus from '../../assets/img/plus.png';

export const AddButton = () => {
  return (
    <button className={styles.button}>
      <img src={plus} className={styles.button__img}></img>
    </button>
  );
};
