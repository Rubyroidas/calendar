import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Link, useParams} from 'react-router-dom';

import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import isoWeek from 'dayjs/plugin/isoWeek';

import * as locales from '../locales';
import {useStore} from '../store';
import {Menu} from './Menu';
import {Month} from './Month';
import {Feedback} from './Feedback';

import './Calendar.scss';

dayjs.extend(isoWeek);

export const Calendar = observer(() => {
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
    useEffect(() => {
        document.body.classList = [...document.body.classList].filter(c => !c.startsWith('theme-'));
        document.body.classList.toggle(`theme-${store.theme}`, !!store.theme);
    }, [store.theme]);

    return (
        <div>
            <Menu/>
            <div className="calendar">
                <h1 className="gradient">{pageTitle} {year}</h1>
                <div className="months">
                    {months.map(month => (
                        <Month key={month} month={month} year={year}/>
                    ))}
                </div>
                <div className="year-links">
                    <Link to={`/${year - 1}`}>&lt; {year - 1}</Link>
                    <Link to={`/${year + 1}`}>{year + 1} &gt;</Link>
                </div>
            </div>
            <Feedback/>
        </div>
    );
});
__DEV__ && (Calendar.displayName = 'Calendar');
