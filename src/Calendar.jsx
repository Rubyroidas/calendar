import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import classNames from 'classnames';

import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import isoWeek from 'dayjs/plugin/isoWeek';

import * as locales from './locales';
import {useStore} from './store';
import {observer} from 'mobx-react';

dayjs.extend(isoWeek);

/**
 * @param {number} month
 * @param {number} year
 * @return {JSX.Element}
 * @constructor
 */
const Month = observer(({month, year}) => {
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

const LanguageSelector = observer(() => {
    const store = useStore();

    return (
        <div className="language-select">
            {store.availableLanguages.map(lang => (
                <div
                    key={lang}
                    className={classNames('flag', lang, {current: lang === store.preferredLanguage})}
                    onClick={() => store.setPreferredLanguage(lang)}
                />
            ))}
        </div>
    );
});
__DEV__ && (LanguageSelector.displayName = 'LanguageSelector');

export const Calendar =  observer(() => {
    const store = useStore();
    const {year: yearStr} = useParams();
    const year = /^\d+$/.test(yearStr) ? parseInt(yearStr, 10) : store.year;

    const months = [];
    for (let i = 1; i <= 12; i++) {
        months.push(i);
    }

    const pageTitle = locales[store.preferredLanguage].pageTitle;
    useEffect(() => {
        document.title = pageTitle;
        store.setYear(year);
    }, [store.preferredLanguage, year]);

    return (
        <div>
            <LanguageSelector/>
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
});
__DEV__ && (Calendar.displayName = 'Calendar');
