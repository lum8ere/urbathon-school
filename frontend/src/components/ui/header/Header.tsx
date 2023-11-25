import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Layout } from 'antd';
import React, { memo } from 'react';
import { ButtonWithTooltips } from '../button/Button';

interface HeaderProps extends React.PropsWithChildren {
    text?: string;
    toggleMenuButton?: React.ReactComponentElement<any>;
    breadcrumbs?: React.ReactComponentElement<any>;
    style?: React.CSSProperties;
}

export const Header = memo<HeaderProps>(({ toggleMenuButton, breadcrumbs, children, style }) => {
    const { Header } = Layout;

    return (
        <Header className="header" style={style}>
            <div
                key="header__container"
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <div
                    className="header__left"
                    style={{
                        display: 'flex',
                        margin: '4px',
                        gap: '10px',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {toggleMenuButton}
                    {breadcrumbs && <div className="header__breadcrumbs">{breadcrumbs}</div>}
                </div>
                <div
                    className="header__content"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '4px'
                    }}
                >
                    {children}
                </div>
                <div
                    className="header__right"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '4px',
                        gap: '4px'
                    }}
                >
                    <ButtonWithTooltips
                        id="profile"
                        tooltipTitle={'profile'}
                        tooltipPlacement="bottomLeft"
                        className="header__profile-button"
                        type="text"
                        icon={
                            <Avatar
                                className="header__avatar"
                                size="small"
                                icon={<UserOutlined />}
                            />
                        }
                    />
                    <ButtonWithTooltips
                        id="logout"
                        tooltipTitle={'logout'}
                        tooltipPlacement="bottomLeft"
                        className="header__logout-button"
                        type="text"
                        icon={<LogoutOutlined />}
                    />
                </div>
            </div>
        </Header>
    );
});
