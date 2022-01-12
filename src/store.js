import React from 'react';
import {makeAutoObservable, runInAction} from 'mobx';
import {locales, localeDayjsMap} from './locales';
import dayjs from 'dayjs';

export class Store {
    theme = null;
    year = null;
    preferredLanguage = 'en';
    availableThemes = [null, 'purple', 'green'];
    availableLanguages = Object.keys(locales);

    constructor() {
        try {
            this.year = parseInt(localStorage.getItem('year'), 10);
            if (Number.isNaN(this.year)) {
                throw new Error();
            }
        } catch (e) {
            this.year = new Date().getFullYear();
        }
        this.theme = localStorage.getItem('theme') || null;
        this.preferredLanguage = localStorage.getItem('preferredLanguage')
            || navigator.languages
                .map(lang => lang.match(/\w+/)[0])
                .find(lang => this.availableLanguages.includes(lang))
            || 'ru';
        dayjs.locale(this.preferredLanguage);
        makeAutoObservable(this);
    }

    setPreferredLanguage(value) {
        runInAction(() => {
            this.preferredLanguage = value;
            localStorage.setItem('preferredLanguage', value);
            dayjs.locale(localeDayjsMap[this.preferredLanguage] || this.preferredLanguage);
        });
    }

    setPreferredTheme(value) {
        runInAction(() => {
            this.theme = value;
            if (value) {
                localStorage.setItem('theme', value);
            } else {
                localStorage.removeItem('theme');
            }
        });
    }

    setYear(value) {
        runInAction(() => {
            this.year = value;
            localStorage.setItem('year', value);
        });
    }
}

export const store = new Store();

if (__DEV__) {
    window.store = store;
}

export const StoreContext = React.createContext(store);
export const useStore = () => React.useContext(StoreContext);
