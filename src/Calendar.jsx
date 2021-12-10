import React from 'react';
import {Link, useParams} from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';

moment.locale(navigator.language);

const monthDescriptions = [
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
]

/**
 * @param month
 * @param year
 * @return {JSX.Element}
 * @constructor
 */
const Month = ({month, year}) => {
    const firstDay = new Date(`${year}-${month}-01`);
    const firstOffset = firstDay.getDay();
    const monthName = moment(firstDay).format('MMMM');

    const offsetters = Array(firstOffset).fill(0).map((_, i) => i);
    const days = [];
    for (let i = 1; i <= 31; i++) {
        const date = new Date(`${year}-${month}-${i}`);
        if (date.getMonth() === month - 1) {
            days.push(date);
        }
    }

    return (
        <div className="month">
            <div className="description">{monthDescriptions[month - 1]}</div>
            <div className="name gradient">{monthName}</div>
            <div className="days">
                {offsetters.map(i => (
                    <div key={i}/>
                ))}
                {days.map(date => (
                    <div key={date.getDate()}
                         className={classNames('day', {holiday: date.getDay() >= 5})}
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

    return (
        <div>
            <h1 className="gradient">Ёбаный календарь {year}</h1>
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
