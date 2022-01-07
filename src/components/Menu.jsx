import React, {useState} from 'react';
import classNames from 'classnames';

import {MenuIcon} from './MenuIcon';
import {LanguageSelector} from './LanguageSelector';
import {ThemeSelector} from './ThemeSelector';

export const Menu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const onMenuClick = () => {
        setCollapsed(v => !v)
    };

    return (
        <menu className={classNames({open: !collapsed})}>
            <MenuIcon onClick={onMenuClick}/>
            <div className="body">
                <LanguageSelector/>
                <ThemeSelector/>
            </div>
        </menu>
    );
};
