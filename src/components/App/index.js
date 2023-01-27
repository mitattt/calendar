/* eslint-disable no-unused-vars */
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
  const [event, setEvent] = useState(null);
  const [isVisibleForm, setIsVisibleForm] = useState(true);

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

  const openFormHandler = (method, eventForUpdate) => {
    console.log('click', method);
    setEvent(eventForUpdate);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
      .then(res => res.json())
      .then(res => setEvents(res));
  }, [today]);

  return (
    <>
      {
        isVisibleForm && (
          <div className={styles.form__position_wrapper}>
            <div className={styles.form__wrapper}>
              <div className={styles.form__createdAt}>Created at 23.12.200 12:21</div>
              <p className={styles.form__hint}>Title *</p>
              <input
                className={styles.form__title}
                placeholder='Title goes here'
                required
              ></input>
              <p className={styles.form__hint}>Description</p>
              <input className={styles.form__description}></input>
              <div className={styles.form__container}>
                <div className={styles.forn__container_wrapper}>
                  <p className={styles.form__hint}>Date</p>
                  <input type='date' className={styles.form__date}></input>
                </div>
                <div className={styles.forn__container_wrapper}>
                  <p className={styles.form__hint}>Begin time</p>
                  <label htmlFor="no_step">
                  </label>
                  <input type="time" id="no_step" className={styles.form__time}></input>
                </div>
              </div>
              <button className={styles.form__button}>Save</button>
            </div>
          </div>
        )
      }
      <div className={styles.container}>
        <Header
          today={today}
          prevHandler={prevHandler}
          currHandler={currHandler}
          nextHandler={nextHandler}
          openFormHandler={openFormHandler}

        />
        <CalendarGrid
          startDay={startDay}
          today={today}
          events={events}
          openFormHandler={openFormHandler}
        />
      </div>
    </>
  );
};

export default App;
