/* eslint-disable react/prop-types */
import React from 'react';
import styles from './AddButton.module.scss';
import plus from '../../assets/img/plus.png';

export const AddButton = ({ openFormHandler, date }) => {
  return (
    <button
      className={styles.button}
      onClick={() => openFormHandler('Save', null, date)}
    >
      <img src={plus} className={styles.button__img}></img>
    </button>
  );
};
