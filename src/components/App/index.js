import React from 'react';
import { Header } from '../Header';
import { CalendarGrid } from '../CalendarGrid';
import styles from './index.module.scss';
import moment from 'moment/moment';

const App = () => {
  moment.updateLocale('en', { week: { dow: 1 } });

  const today = moment();
  const startDay = today.clone().startOf('month').startOf('day');

  return (
    <div className={styles.container}>
      <Header today={today} />
      <CalendarGrid startDay={startDay} />
    </div>
  );
};

export default App;
