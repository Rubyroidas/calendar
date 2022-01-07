import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {Calendar} from './components/Calendar';

import './App.scss';

export const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Calendar/>}/>
            <Route path="/:year" element={<Calendar/>}/>
        </Routes>
    </BrowserRouter>
);
