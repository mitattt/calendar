/* eslint-disable react/prop-types */
import React from 'react';
import styles from './DateSwitcher.module.scss';

// eslint-disable-next-line react/prop-types
export const DateSwitcher = ({ today }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button}>{'<'}</button>
      <button className={styles.button__middle}>{today.format('MMMM')}</button>
      <button className={styles.button}>{'>'}</button>
    </div>
  );
};
