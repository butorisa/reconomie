import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './main/pages/Login';
import Payment from './main/pages/Payment';

const element = document.getElementById('root');
const root = createRoot(element!);
root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Login />} />
            <Route path="/payment" element={<Payment />} />
        </Routes>
    </BrowserRouter>
);
