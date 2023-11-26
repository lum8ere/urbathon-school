import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Card, Tag } from 'antd';
import { memo } from 'react';
import { NewsAndAnnouncementsProps } from './types';

export const NewsAndAnnouncements = memo<NewsAndAnnouncementsProps>(({ data }) => {
    console.log(data);
    return (
        <div>
            {data.map((item: any, index: number) => (
                <Card key={index} title={item.title} style={{ marginBottom: '16px' }}>
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                    <Tag
                        icon={item.tag === 'warning' ? <ExclamationCircleOutlined /> : null}
                        color={item.tag}
                    >
                        {item.tag === 'warning' ? 'Объявление' : 'Новость'}
                    </Tag>
                </Card>
            ))}
        </div>
    );
});
