import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Col, Row, Select } from 'antd';
import { Dayjs } from 'dayjs';
import { useCallback, useRef, useState } from 'react';
import { ButtonWithTooltips } from 'components/ui/button/Button';
import { ScheduleEditPanel } from './ScheduleEditPanel';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

type SelectedUser = {
    value: string | null;
};

export const SheduleCalendar = () => {
    const calendarRef = useRef<any>(null);
    const [editable, setEditable] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<SelectedUser>({
        value: null
    });

    const handelEnableEdit = useCallback(() => {
        setEditable(true);
    }, [setEditable]);

    const handelSave = useCallback(() => {
        setEditable(false);
    }, [setEditable]);

    const handleChangeSelect = useCallback(
        (value: string) => {
            const selected = {
                value: value
            };
            setSelectedUser(selected);
        },
        [setSelectedUser]
    );

    return (
        <>
            <Row>
                <div>
                    {!editable && (
                        <ButtonWithTooltips
                            id="menu_mode"
                            tooltipTitle={'Редактировать'}
                            className="btn-menu"
                            onClick={handelEnableEdit}
                            icon={<EditOutlined />}
                            type="text"
                        >
                            Редактировать
                        </ButtonWithTooltips>
                    )}
                    {editable && (
                        <>
                            <ButtonWithTooltips
                                id="menu_mode"
                                tooltipTitle={'Сохранить'}
                                className="btn-menu"
                                onClick={handelSave}
                                icon={<SaveOutlined />}
                                type="text"
                            >
                                Сохранить
                            </ButtonWithTooltips>
                            <Select
                                defaultValue="students"
                                style={{ width: 120 }}
                                onChange={handleChangeSelect}
                                options={[
                                    { value: 'students', label: 'Ученики' },
                                    { value: 'teachers', label: 'Учителя' }
                                ]}
                            />
                        </>
                    )}
                </div>
            </Row>
            <Row>
                {editable && (
                    <Col flex="3 3 0">
                        <ScheduleEditPanel selectedUser={selectedUser} />
                    </Col>
                )}
                <Col flex={7}>
                    <FullCalendar
                        ref={calendarRef}
                        allDaySlot={false}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        locale="ru"
                        timeZone="utc"
                        eventTimeFormat={{
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        }}
                        displayEventEnd
                        dayMaxEvents={false}
                        dayHeaderFormat={{ weekday: 'long' }}
                        initialView="dayGridMonth"
                        editable={editable}
                        // eventSources={events}
                    />
                </Col>
            </Row>
        </>
    );
};
