import React, { useEffect, useState } from 'react';
import { Header } from '../Header';
import { CalendarGrid } from '../CalendarGrid';
import styles from './index.module.scss';
import moment from 'moment/moment';

const BASE_URL = 'http://localhost:5000';

const App = () => {
  moment.updateLocale('en', { week: { dow: 1 } });

  const [today, setToday] = useState(moment());
  const [events, setEvents] = useState([]);

  const startDay = today.clone().startOf('month').startOf('week').subtract(1, 'day');
  const startDateQuery = startDay.clone().format('X');
  const endDateQuery = startDay.clone().add(42, 'days').format('X');

  const prevHandler = () => {
    setToday(today => today.clone().subtract(1, 'month'));
  };
  const currHandler = () => { setToday(moment()); };
  const nextHandler = () => {
    setToday(today => today.clone().add(1, 'month'));
  };

  useEffect(() => {
    fetch(`${BASE_URL}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
      .then(res => res.json())
      .then(res => setEvents(res));
  }, [today]);

  return (
    <div className={styles.container}>
      <Header
        today={today}
        prevHandler={prevHandler}
        currHandler={currHandler}
        nextHandler={nextHandler}

      />
      <CalendarGrid
        startDay={startDay}
        today={today}
        events={events}
      />
    </div>
  );
};

export default App;
