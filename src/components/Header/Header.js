/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import moment from 'moment';
import { AddButton } from '../AddButton';
import { DateSwitcher } from '../DateSwitcher';
import styles from './Header.module.scss';

export const Header = ({
  today, openFormHandler, setToday, date
}) => {
  const handleDateChange = (date) => {
    setToday(date);
  };

  return (
    <div className={styles.container}>
      <AddButton openFormHandler={openFormHandler} date={date}/>
      <div className={styles.container__right}>
        <DateSwitcher
          today={today}
          handleDateChange={handleDateChange}
          setToday={setToday}
        />
        <div className={styles.date}>
          <input
            type="date"
            value={today.format('YYYY-MM-DD')}
            onChange={(e) => handleDateChange(moment(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};
