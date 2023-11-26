import { memo, useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Input, Tag, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { ButtonWithTooltips } from '../button/Button';
import { NewsAndAnnouncementsProps } from './types';

type NewsItem = {
    id: number;
    title: string;
    content: string;
    tag: string;
    date?: Date;
};

export const NewsAndAnnouncementsEditing = memo<NewsAndAnnouncementsProps>(({ data }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [newsData, setNewsData] = useState<NewsItem[]>(data);

    const handleCreatePost = useCallback(() => {
        navigate('/dashboards/posts/create');
    }, [navigate]);

    const handleEditPost = useCallback(
        (id: number) => {
            navigate(`/dashboards/posts/edit/${id}`);
        },
        [navigate]
    );

    const handleDeletePost = useCallback(
        (id: number) => {
            // TODO: Логика удаления
        },
        [newsData]
    );

    const renderCardTitle = (item: NewsItem) => {
        if (location.pathname.includes('?')) {
            return <Input value={item.title} />;
        } else {
            return item.title;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <ButtonWithTooltips
                    id="menu_mode"
                    tooltipTitle={'Создать'}
                    className="btn-menu"
                    onClick={handleCreatePost}
                    icon={<EditOutlined />}
                    type="text"
                >
                    Создать
                </ButtonWithTooltips>
            </div>
            <div>
                {newsData.map((item, index) => (
                    <Card
                        key={index}
                        title={renderCardTitle(item)}
                        style={{ marginBottom: '16px' }}
                        extra={
                            <>
                                <ButtonWithTooltips
                                    id={`edit_button-${index}`}
                                    tooltipTitle={'Редактировать'}
                                    className="btn-menu"
                                    onClick={() => handleEditPost(item.id)}
                                    icon={<EditOutlined />}
                                    type="text"
                                />
                                <Popconfirm
                                    title="Вы уверены, что хотите удалить эту запись?"
                                    okText="Да"
                                    cancelText="Отмена"
                                    onConfirm={() => handleDeletePost(item.id)}
                                >
                                    <ButtonWithTooltips
                                        id={`delete_button-${index}`}
                                        tooltipTitle={'Удалить'}
                                        className="btn-menu"
                                        icon={<DeleteOutlined />}
                                        type="text"
                                    />
                                </Popconfirm>
                            </>
                        }
                    >
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
        </div>
    );
});
