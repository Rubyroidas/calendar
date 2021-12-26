import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import classNames from 'classnames';

import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import isoWeek from 'dayjs/plugin/isoWeek';

import * as locales from './locales';

dayjs.extend(isoWeek);

const preferredLanguage = navigator.languages
    .map(lang => lang.match(/\w+/)[0])
    .find(lang => Object.keys(locales).includes(lang))
    || 'ru';
dayjs.locale(preferredLanguage);

/**
 * @param {number} month
 * @param {number} year
 * @return {JSX.Element}
 * @constructor
 */
const Month = ({month, year}) => {
    const firstMonday = dayjs(`${year}-${month}-10`).startOf('isoWeek').date() % 7;
    const skipDays = 8 - firstMonday;
    const firstDay = new Date(`${year}-${month}-01`);
    const monthName = dayjs(firstDay).format('MMMM');

    const offsetters = Array(skipDays).fill(0).map((_, i) => i);
    const days = [];
    for (let i = 1; i <= 31; i++) {
        const date = new Date(`${year}-${month}-${i}`);
        if (date.getMonth() === month - 1) {
            days.push(date);
        }
    }

    return (
        <div className="month">
            <div className="description">{locales[preferredLanguage].monthDescriptions[month - 1]}</div>
            <div className="name gradient">{monthName}</div>
            <div className="days">
                {locales[preferredLanguage].weekDays.map((day, i) => (
                    <div key={i} className={classNames('day', {holiday: i >= 5})}>{day}</div>
                ))}
                {offsetters.map(i => (
                    <div key={i}/>
                ))}
                {days.map(date => (
                    <div key={date.getDate()}
                         className={classNames('day', {holiday: dayjs(`${year}-${month}-${date.getDate()}`).isoWeekday() >= 6})}
                    >{date.getDate()}</div>
                ))}
            </div>
        </div>
    );
};

export const Calendar = () => {
    const {year: yearStr} = useParams();
    const year = /^\d+$/.test(yearStr) ? parseInt(yearStr, 10) : new Date().getFullYear();

    const months = [];
    for (let i = 1; i <= 12; i++) {
        months.push(i);
    }

    const pageTitle = locales[preferredLanguage].pageTitle;
    useEffect(() => {
        document.title = pageTitle;
    }, []);

    return (
        <div>
            <h1 className="gradient">{pageTitle} {year}</h1>
            <div className="year-links">
                <Link to={`/${year - 1}`}>&lt; {year - 1}</Link>
                <Link to={`/${year + 1}`}>{year + 1} &gt;</Link>
            </div>
            <div className="months">
                {months.map(month => (
                    <Month key={month} month={month} year={year}/>
                ))}
            </div>
        </div>
    );
};
