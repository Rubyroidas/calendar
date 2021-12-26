import React from 'react';
import {makeAutoObservable, runInAction} from 'mobx';
import * as locales from './locales';
import dayjs from 'dayjs';

export class Store {
    // theme = null;
    year = null;
    preferredLanguage = 'en';
    availableLanguages = Object.keys(locales);

    constructor() {
        try {
            this.year = parseInt(localStorage.getItem('year'), 10);
        } catch (e) {
            this.year = new Date().getFullYear();
        }
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
            dayjs.locale(this.preferredLanguage);
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
