/* eslint-disable react/prop-types */
import React from 'react';
import styles from './CalendarGrid.module.scss';
import classNames from 'classnames';
import moment from 'moment/moment';

export const CalendarGrid = ({
  startDay,
  today,
  events,
  openFormHandler
}) => {
  const day = startDay.clone();
  const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());

  const isToday = (day) => moment().isSame(day, 'day');
  const isSelectedMonth = (day) => today.isSame(day, 'month');
  const DaysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <>
      <div className={styles.days} >
        {[...DaysOfTheWeek].map((el, i) => (
          <div
            key={i}
            className={classNames(
              styles.days__currDay
            )}>
            {el}
          </div>
        ))}
      </div>
      <div className={styles.calendar}>

        {daysArray.map((currDay) => (
          <div
            key={currDay.unix()}
            className={classNames(
              styles.calendar__wrapper, {
                [styles.calendar__is_weekend]: currDay.day() === 6 || currDay.day() === 0,
                [styles.is_selected]: isSelectedMonth(currDay)
              }
            )}
          >
            <div className={styles.calendar__row_in_cell}>
              <div className={styles.calendar__show__day_wrapper}>
                <div className={styles.calendar__day_wrapper}>
                  {isToday(currDay)
                    ? (
                      <div className={styles.calendar__current_day}>
                        {currDay.format('D')}
                      </div>
                    )
                    : (currDay.format('D'))
                  }
                </div>
              </div>

              <div>
                <ul className={styles.calendar__event_list_wrapper}>
                  {
                    events
                      .filter(ev => ev.date >= currDay.format('X') && ev.date <= currDay.clone().endOf('day').format('X'))
                      .map(ev => (
                        <li key={ev.id}>
                          <button
                            className={styles.calendar__event_item_wrapper}
                            onClick={(e) => openFormHandler('Update', ev)}
                          >
                            {ev.title}
                          </button>
                        </li>
                      ))
                  }
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
