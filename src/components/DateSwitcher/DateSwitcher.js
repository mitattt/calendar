/* eslint-disable react/prop-types */
import React from 'react';
import styles from './DateSwitcher.module.scss';

export const DateSwitcher = ({
  setToday, handleDateChange, today
}) => {
  const prevHandler = () => {
    setToday(currentMonth => currentMonth.clone().subtract(1, 'month'));
  };
  const nextHandler = () => {
    setToday(currentMonth => currentMonth.clone().add(1, 'month'));
  };

  return (
    <div className={styles.container}>
      <button
        onClick={prevHandler}
        className={styles.button}
      >
        {'<'}
      </button>

      <button
        onClick={() => handleDateChange(today)}
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
