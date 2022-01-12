import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import 'dayjs/locale/de';
import 'dayjs/locale/es';
import isoWeek from 'dayjs/plugin/isoWeek';

import * as ru from './ru.json';
import * as uk from './uk.json';
import * as en from './en.json';
import * as de from './de.json';
import * as es from './es.json';
import * as ca from './ca.json';
import * as us from './us.json';

dayjs.extend(isoWeek);

export const locales = {
    ru,
    uk,
    en,
    de,
    es,
    ca,
    us,
};

export const localeDayjsMap = {
    ca: 'en',
    us: 'en',
};
