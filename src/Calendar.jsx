import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import classNames from 'classnames';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);
dayjs.locale(navigator.language);

const pageTitles = {
    ru: 'Ёбаный календарь',
    ua: 'Йобаний календар',
    en: 'Fucking calendar',
};
const monthDescriptions = {
    ru: [
        'Ёбаный новый год',
        'Ёбаный холод',
        'Ёбаная грязь',
        'Ёбаные шутники',
        'Ёбаный день труда',
        'Ёбаные школьники',
        'Ёбаная жара',
        'Ёбаный отпуск',
        'Ёбаное 3 сентября',
        'Ёбаный дождь',
        'Ёбаные скидки',
        'Ёбаные подарки',
    ],
    ua: [
        'Йобаний новий рік',
        'Йобаний холод',
        'Йобаний бруд',
        'Йобані жартівники',
        'Йобаний день праці',
        'Йобані школярі',
        'Йобана спека',
        'Йобаний відпустка',
        'Йобане 3 вересня',
        'Йобаний дощ',
        'Йобані знижки',
        'Йобані подарунки',
    ],
    en: [
        'Fucking new year',
        'Fucking freezing',
        'Fucking dirt',
        'Fucking jokers',
        'Fucking labor day',
        'Fucking students',
        'Fucking hot',
        'Fucking vacation',
        'Fucking 3rd september',
        'Fucking raining',
        'Fucking discounts',
        'Fucking gifts',
    ],
};
const weekDays = {
    ru: [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс',
    ],
    ua: [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Нд',
    ],
    en: [
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa',
        'Su',
    ],
};

const preferredLanguage = navigator.languages
    .map(lang => lang.match(/\w+/)[0])
    .find(lang => Object.keys(monthDescriptions).includes(lang))
    || 'ru';

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
            <div className="description">{monthDescriptions[preferredLanguage][month - 1]}</div>
            <div className="name gradient">{monthName}</div>
            <div className="days">
                {weekDays[preferredLanguage].map((day, i) => (
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

    const pageTitle = pageTitles[preferredLanguage];
    useEffect(() => {
        document.title = pageTitle;
    }, []);

    return (
        <div>
            <h1 className="gradient">{pageTitle} {year}</h1>
            <div>
                <Link to={`/${year - 1}`}>&lt;{year - 1}</Link>
                <Link to={`/${year + 1}`}>{year + 1}&gt;</Link>
            </div>
            <div className="months">
                {months.map(month => (
                    <Month key={month} month={month} year={year}/>
                ))}
            </div>
        </div>
    );
};
