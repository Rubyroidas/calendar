import {useStore} from '../store';
import * as locales from '../locales';
import React from 'react';

export const Feedback = () => {
    const store = useStore();
    const url = 'https://docs.google.com/forms/d/18XB760X2BtRs0zMy7HAqhI-GFGgHTB7La8Wa1azNiVs/edit?usp=sharing';

    return (
        <a className="feedback" href={url} target="_blank">
            {locales[store.preferredLanguage].feedback}
        </a>
    );
};
