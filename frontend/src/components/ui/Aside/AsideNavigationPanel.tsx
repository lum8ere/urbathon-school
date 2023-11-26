import { Drawer } from 'antd';
import { memo } from 'react';
import { routes } from 'routing/routes';
import { LeftMenuParentItem } from './LeftMenuParentItem';

interface AsideNavigatonPanelProps {
    isOpenStatus: boolean;
}

export const asideWidthOpen = 320;
export const asideWidthClose = 50;

export const AsideNavigationPanel = memo<AsideNavigatonPanelProps>(({ isOpenStatus }) => {
    return (
        <Drawer
            placement="left"
            closable={false}
            open
            width={isOpenStatus ? asideWidthOpen : asideWidthClose}
            bodyStyle={{
                padding: 0,
                backgroundColor: '#07204A',
                overflowX: 'hidden'
            }}
            headerStyle={{
                padding: 0,
                backgroundColor: '#374254'
            }}
            mask={false}
        >
            <LeftMenuParentItem routes={routes} open={isOpenStatus} />
        </Drawer>
    );
});
