import { Calendar, CalendarProps } from 'antd';
import { Dayjs } from 'dayjs';

export const ShedulePage = () => {
    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    return <Calendar onPanelChange={onPanelChange} />;
};
