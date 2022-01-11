import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export * as ru from './ru.json';
export * as uk from './uk.json';
export * as en from './en.json';
export * as de from './de.json';
export * as es from './es.json';
export * as ca from './ca.json';
export * as us from './us.json';
