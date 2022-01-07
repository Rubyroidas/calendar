import React, {useState} from 'react';
import classNames from 'classnames';

import {LanguageSelector} from './LanguageSelector';
import {ThemeSelector} from './ThemeSelector';

import './Menu.scss';

const MenuIcon = ({onClick}) => (
    <svg onClick={onClick} className="menu-icon" viewBox="0 0 32 32"
         xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="6" width="28" height="6" rx="4"/>
        <rect x="2" y="13" width="28" height="6" rx="4"/>
        <rect x="2" y="20" width="28" height="6" rx="4"/>
    </svg>
);

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
