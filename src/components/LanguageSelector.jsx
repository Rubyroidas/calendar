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
            <div className="list">
                {store.availableLanguages.map(lang => (
                    <div
                        key={lang}
                        className={classNames('flag', {current: lang === store.preferredLanguage})}
                        style={{backgroundImage: `url(/img/flag-${lang}.png)`}}
                        onClick={() => store.setPreferredLanguage(lang)}
                    />
                ))}
            </div>
        </div>
    );
});
__DEV__ && (LanguageSelector.displayName = 'LanguageSelector');
