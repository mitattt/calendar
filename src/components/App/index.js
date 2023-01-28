/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Header } from '../Header';
import { CalendarGrid } from '../CalendarGrid';
import styles from './index.module.scss';
import moment from 'moment/moment';

const BASE_URL = 'http://localhost:5000';
const defaultEvent = {
  title: '',
  description: '',
  date: moment().format('X')
};

const App = () => {
  moment.updateLocale('en', { week: { dow: 1 } });

  const [today, setToday] = useState(moment());
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [method, setMethod] = useState(null);
  const [date, setDate] = useState('');

  const startDay = today.clone().startOf('month').startOf('week').subtract(1, 'day');
  const startDateQuery = startDay.clone().format('X');
  const endDateQuery = startDay.clone().add(42, 'days').format('X');

  const openFormHandler = (methodName, eventForUpdate, date) => {
    const newDate = moment(date, 'YYYY-MM-DD').valueOf();

    setIsVisibleForm(true);
    setEvent(eventForUpdate || {
      ...defaultEvent,
      date: newDate
    });
    setMethod(methodName);
  };

  const cancelFormHandler = () => {
    setIsVisibleForm(false);
    setEvent(null);
  };

  const removeEventHandler = () => {
    const fetchUrl = `${BASE_URL}/events/${event.id}`;
    const httpMethod = 'DELETE';

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        setEvents(prevState => prevState.filter(e => e.id !== event.id));
        cancelFormHandler();
      });
  };

  const changeEventHandler = (text, field) => {
    setEvent(prev => ({
      ...prev,
      [field]: text
    }));
  };

  const eventFetchHandler = () => {
    const fetchUrl = method === 'Update'
      ? `${BASE_URL}/events/${event.id}`
      : `${BASE_URL}/events`;
    const httpMethod = method === 'Update' ? 'PATCH' : 'POST';

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
      .then(res => res.json())
      .then(res => {
        if (method === 'Update') {
          setEvents(prev => prev.map(e => e.id === res.id ? res : e));
        } else {
          setEvents(prev => [...prev, res]);
        }
        cancelFormHandler();
      });
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
                value={event.title}
                onChange={e => changeEventHandler(e.target.value, 'title')}
              ></input>
              <p className={styles.form__hint}></p>
              <textarea
                className={styles.form__description}
                value={event.description}
                onChange={e => changeEventHandler(e.target.value, 'description')}
              ></textarea>
              <div className={styles.form__container}>
                <div className={styles.forn__container_wrapper}>
                  <p className={styles.form__hint}>Date</p>
                  <input
                    type='date'
                    className={styles.form__date}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setEvent({ ...event, date: e.target.value });
                    }}
                    required
                  />
                </div>
                <div className={styles.forn__container_wrapper}>
                  <p className={styles.form__hint}>Begin time</p>
                  <label htmlFor="no_step">
                  </label>
                  <input type="time" id="no_step" className={styles.form__time}></input>
                </div>
              </div>
              <div className={styles.form__buttons}>
                <button
                  className={styles.form__button_save}
                  onClick={eventFetchHandler}
                >
                  {method}
                </button>
                <button
                  className={styles.form__button_cancel}
                  onClick={cancelFormHandler}
                >
                  Cancel
                </button>
                {
                  method === 'Update' && (
                    <button
                      className={styles.form__button_save}
                      onClick={removeEventHandler}
                    >
                      Remove
                    </button>
                  )
                }

              </div>
            </div>
          </div>
        )
      }
      <div className={styles.container}>
        <Header
          today={today}
          openFormHandler={openFormHandler}
          setToday={setToday}
          date={date}

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
