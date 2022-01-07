import {useStore} from '../store';
import * as locales from '../locales';
import React from 'react';

export const Feedback = () => {
    const store = useStore();
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSc-vqiDyojLT_nWx1zLOBIr4lhsfBlZsH3FtG9ZRd9B9ffnyg/viewform';

    return (
        <a className="feedback" href={url} target="_blank">
            {locales[store.preferredLanguage].feedback}
        </a>
    );
};
