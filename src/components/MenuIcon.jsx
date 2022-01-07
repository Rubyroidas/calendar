import React from 'react';

export const MenuIcon = ({onClick}) => (
    <svg onClick={onClick} className="menu-icon" viewBox="0 0 32 32"
         xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="6" width="28" height="6" rx="4"/>
        <rect x="2" y="13" width="28" height="6" rx="4"/>
        <rect x="2" y="20" width="28" height="6" rx="4"/>
    </svg>
);
