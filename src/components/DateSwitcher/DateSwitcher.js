/* eslint-disable react/prop-types */
import React from 'react';
import styles from './DateSwitcher.module.scss';

// eslint-disable-next-line react/prop-types
export const DateSwitcher = ({
  today, currHandler, prevHandler, nextHandler
}) => {
  return (
    <div className={styles.container}>
      <button
        onClick={prevHandler}
        className={styles.button}
      >
        {'<'}
      </button>

      <button
        onClick={currHandler}
        className={styles.button__middle}
      >
        {today.format('MMMM')} {today.format('YYYY')}
      </button>

      <button
        onClick={nextHandler}
        className={styles.button}
      >
        {'>'}
      </button>
    </div>
  );
};
