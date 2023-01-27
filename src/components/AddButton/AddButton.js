/* eslint-disable react/prop-types */
import React from 'react';
import styles from './AddButton.module.scss';
import plus from '../../assets/img/plus.png';

export const AddButton = ({ openFormHandler }) => {
  return (
    <button
      className={styles.button}
      onClick={() => openFormHandler('Save')}
    >
      <img src={plus} className={styles.button__img}></img>
    </button>
  );
};
