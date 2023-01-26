/* eslint-disable react/prop-types */
import React from 'react';
import styles from './CalendarGrid.module.scss';
import classNames from 'classnames';
import moment from 'moment/moment';

export const CalendarGrid = ({ startDay }) => {
  const day = startDay.clone();
  const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());

  const isToday = (day) => moment().isSame(day, 'day');

  return (
    <div className={styles.calendar}>
      {daysArray.map((currDay) => (
        <div
          key={currDay.format('DDMMYYYY')}
          className={classNames(
            styles.calendar__wrapper, {
              calendar__is_weeekend: currDay.day() === 6 || currDay.day() === 0
            } // FIXME: ask on QnA how to combine 2 classes
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
  );
};
