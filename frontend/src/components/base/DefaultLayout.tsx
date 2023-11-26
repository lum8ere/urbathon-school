import React, { memo, useCallback, useState } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { Header } from 'components/ui/header/Header';
import {
    AsideNavigationPanel,
    asideWidthClose,
    asideWidthOpen
} from 'components/ui/Aside/AsideNavigationPanel';
import { ButtonWithTooltips } from 'components/ui/button/Button';

type DefaultLayoutProps = React.PropsWithChildren;

const DefaultLayout = memo<DefaultLayoutProps>(({ children }) => {
    const [open, setOpen] = useState(true);

    const { Content } = Layout;

    const handleAsideToggle = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AsideNavigationPanel isOpenStatus={open} />
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        backgroundColor: 'white',
                        marginLeft: open ? asideWidthOpen : asideWidthClose
                    }}
                    toggleMenuButton={
                        <ButtonWithTooltips
                            id="menu_mode"
                            tooltipTitle={open ? 'close_menu' : 'open_menu'}
                            className="btn-menu"
                            onClick={handleAsideToggle}
                            icon={open ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                            type="text"
                        />
                    }
                />
                <Content
                    style={{
                        margin: '0px 16px',
                        padding: '24px',
                        background: '#f4f7fa',
                        marginTop: 0,
                        marginLeft: open ? asideWidthOpen : asideWidthClose
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
});

export default DefaultLayout;
