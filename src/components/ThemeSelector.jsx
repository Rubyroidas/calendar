import React from 'react';
import {observer} from 'mobx-react';
import classNames from 'classnames';

import {useStore} from '../store';
import * as locales from '../locales';

import './ThemeSelector.scss';

export const ThemeSelector = observer(() => {
    const store = useStore();

    return (
        <div className="theme-select">
            {locales[store.preferredLanguage].theme}:
            <div className="list">
                {store.availableThemes.map(theme => (
                    <div
                        key={theme}
                        className={classNames('theme-item', `theme-${theme || 'default'}`, {current: theme === store.theme})}
                        onClick={() => store.setPreferredTheme(theme)}
                    />
                ))}
            </div>
        </div>
    );
});
__DEV__ && (ThemeSelector.displayName = 'ThemeSelector');
