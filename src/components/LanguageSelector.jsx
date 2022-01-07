import React from 'react';
import {observer} from 'mobx-react';
import classNames from 'classnames';

import {useStore} from '../store';
import * as locales from '../locales';

import './LanguageSelector.scss';

export const LanguageSelector = observer(() => {
    const store = useStore();

    return (
        <div className="language-select">
            {locales[store.preferredLanguage].language}:
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
