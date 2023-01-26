/* eslint-disable react/prop-types */
import React from 'react';
import styles from './CalendarGrid.module.scss';
import classNames from 'classnames';
import moment from 'moment/moment';

export const CalendarGrid = ({ startDay }) => {
  const day = startDay.clone();
  const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());

  const isToday = (day) => moment().isSame(day, 'day');
  const DaysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <>
      <div className={styles.days} >
        {[...DaysOfTheWeek].map((el, i) => (
          <div key={i} className={styles.days__currDay}>
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
                [styles.calendar__is_weekend]: currDay.day() === 6 || currDay.day() === 0
              }
            )}
          >
            <div className={styles.calendar__row_in_cell}>
              <div className={styles.calendar__day_wrapper}>
                {!isToday(currDay) && currDay.format('D')}
                {isToday(currDay) && (
                  <div className={styles.calendar__current_day}>
                    {currDay.format('D')}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
