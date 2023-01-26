/* eslint-disable react/prop-types */
import React from 'react';
import { AddButton } from '../AddButton';
import { DateSwitcher } from '../DateSwitcher';
import styles from './Header.module.scss';

export const Header = ({
  today, currHandler, prevHandler, nextHandler
}) => {
  return (
    <div className={styles.container}>
      <AddButton />
      <DateSwitcher
        today={today}
        prevHandler={prevHandler}
        currHandler={currHandler}
        nextHandler={nextHandler}
      />
    </div>
  );
};
