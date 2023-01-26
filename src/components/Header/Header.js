import React from 'react';
import { AddButton } from '../AddButton';
import { DateSwitcher } from '../DateSwitcher';
import styles from './Header.module.scss';

// eslint-disable-next-line react/prop-types
export const Header = ({ today }) => {
  return (
    <div className={styles.container}>
      <AddButton />
      <DateSwitcher today={today}/>
    </div>
  );
};
