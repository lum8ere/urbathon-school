import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AsideNavigationHeader = () => {
    const navigate = useNavigate();

    return (
        <div style={{ backgroundColor: '#374254' }}>
            <li className="nav-header-title" onClick={() => navigate('/')}>
                <h3 style={{ fontSize: '16px', fontWeight: '500' }}>PROJECT</h3>
            </li>
        </div>
    );
};
