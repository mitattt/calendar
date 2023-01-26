import React, { useState } from 'react';
import { Header } from '../Header';
import { CalendarGrid } from '../CalendarGrid';
import styles from './index.module.scss';
import moment from 'moment/moment';

const App = () => {
  moment.updateLocale('en', { week: { dow: 1 } });

  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week').subtract(1, 'day');

  const prevHandler = () => {
    setToday(today => today.clone().subtract(1, 'month'));
  };
  const currHandler = () => {
    setToday(moment());
  };
  const nextHandler = () => {
    setToday(today => today.clone().add(1, 'month'));
  };

  return (
    <div className={styles.container}>
      <Header
        today={today}
        prevHandler={prevHandler}
        currHandler={currHandler}
        nextHandler={nextHandler}

      />
      <CalendarGrid startDay={startDay} today={today} />
    </div>
  );
};

export default App;
