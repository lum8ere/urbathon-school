import { TimePicker } from 'antd';
import { memo } from 'react';

export const TimeRangeField = memo(() => {
    return (
        <TimePicker.RangePicker
            placeholder={['no_value_start', 'no_value_end']}
            // Установка значения диапазона дат в компоненте выбора диапазона дат
            // value={value}
            // Обработка изменения значения диапазона дат в компоненте выбора диапазона дат
            // onChange={(time) => {
            //     if (!onInputChange || !onBlur) return;
            //     const [from_time, to_time]: [dayjs.Dayjs | null, dayjs.Dayjs | null] =
            //         time || [null, null];

            //     onInputChange({
            //         from_time: from_time && from_time.local().format('HH:mm:ss'),
            //         to_time: to_time && to_time.local().format('HH:mm:ss')
            //     });

            //     onBlur();
            // }}
            format={'HH:mm'}
            inputReadOnly
            allowClear
        />
    );
});
