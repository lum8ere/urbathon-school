import React, { memo } from 'react';
import { Spin } from 'antd';
import './loading.scss';

export const Loader = memo<any>(({ ...props }) => (
    <div className="loading">
        <Spin {...props} />
    </div>
));
