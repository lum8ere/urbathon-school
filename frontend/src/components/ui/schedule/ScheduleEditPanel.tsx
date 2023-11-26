import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Card, Col, DatePicker, DatePickerProps, Row, Select } from 'antd';
import { Dayjs } from 'dayjs';
import { memo, useCallback, useRef, useState } from 'react';
import { ButtonWithTooltips } from 'components/ui/button/Button';
import { DateTimeRangeField } from '../DatePicker/DateTimeRangeField';
import { TimeRangeField } from '../DatePicker/TimeRangeField';

type ScheduleEditPanelProps = {
    selectedUser: {
        value: string | null;
    };
};

export const ScheduleEditPanel = memo<ScheduleEditPanelProps>(({ selectedUser }) => {
    // 0 - пн 1 - вт 2 - ср 3 - чт 5 - пн 6 - вс

    const handelChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <>
            <Card title="Слоты графика">
                <div>
                    <Select
                        defaultValue="students"
                        style={{ width: 120 }}
                        // onChange={handleChangeSelect}
                        options={[
                            { value: 'students', label: 'Ученики' },
                            { value: 'teachers', label: 'Учителя' }
                        ]}
                    />
                    <DatePicker onChange={handelChangeDate} />
                    <TimeRangeField />

                    <ButtonWithTooltips
                        id="menu_mode"
                        tooltipTitle={'Добавить'}
                        className="btn-menu"
                        // onClick={handelEnableEdit}
                        // icon={<EditOutlined />}
                        type="primary"
                    >
                        Добавить
                    </ButtonWithTooltips>
                </div>
            </Card>
        </>
    );
});
