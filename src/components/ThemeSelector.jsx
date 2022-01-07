import React from 'react';
import {observer} from 'mobx-react';
import classNames from 'classnames';

import {useStore} from '../store';
import * as locales from '../locales';

export const ThemeSelector = observer(() => {
    const store = useStore();

    return (
        <div className="theme-select">
            {locales[store.preferredLanguage].theme}:
            {store.availableThemes.map(theme => (
                <div
                    key={theme}
                    className={classNames('theme-item', `theme-${theme || 'default'}`, {current: theme === store.theme})}
                    onClick={() => store.setPreferredTheme(theme)}
                />
            ))}
        </div>
    );
});
__DEV__ && (ThemeSelector.displayName = 'ThemeSelector');
