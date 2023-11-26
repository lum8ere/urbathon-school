import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Col, Row } from 'antd';
import { Dayjs } from 'dayjs';
import { useCallback, useRef, useState } from 'react';
import { ButtonWithTooltips } from 'components/ui/button/Button';
import { SheduleCalendar } from 'components/ui/schedule/SheduleCalendar';

export const ShedulePage = () => {
    const calendarRef = useRef<any>(null);
    const [editable, setEditable] = useState<boolean>(false);

    const handelEnableEdit = useCallback(() => {
        setEditable(true);
    }, [setEditable]);

    return (
        <>
            <SheduleCalendar />
        </>
    );
};
