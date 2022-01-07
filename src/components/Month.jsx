import React from 'react';
import {observer} from 'mobx-react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import {useStore} from '../store';
import * as locales from '../locales';

import './Month.scss';

export const Month = observer(({month, year}) => {
    const store = useStore();
    const firstMonday = dayjs(`${year}-${month.toString().padStart(2, '0')}-10`).startOf('isoWeek').date() % 7;
    const skipDays = 8 - firstMonday;
    const firstDay = new Date(`${year}-${month.toString().padStart(2, '0')}-01`);
    const monthName = dayjs(firstDay).format('MMMM');

    const offsetters = Array(skipDays).fill(0).map((_, i) => i);
    const days = [];
    for (let i = 1; i <= 31; i++) {
        const date = new Date(`${year}-${month.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`);
        if (date.getMonth() === month - 1) {
            days.push(date);
        }
    }

    return (
        <div className="month">
            <div className="description">{locales[store.preferredLanguage].monthDescriptions[month - 1]}</div>
            <div className="name gradient">{monthName}</div>
            <div className="days">
                {locales[store.preferredLanguage].weekDays.map((day, i) => (
                    <div key={i} className={classNames('day', {holiday: i >= 5})}>{day}</div>
                ))}
                {offsetters.map(i => (
                    <div key={i}/>
                ))}
                {days.map(date => (
                    <div key={date.getDate()}
                         className={classNames('day', {holiday: dayjs(`${year}-${month.toString().padStart(2, '0')}-${date.getDate()}`).isoWeekday() >= 6})}
                    >{date.getDate()}</div>
                ))}
            </div>
        </div>
    );
});
__DEV__ && (Month.displayName = 'Month');
