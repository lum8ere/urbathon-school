import { memo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { Button, Form, Input, Select } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { news } from 'mockData';
import { EmptyMarker } from 'components/ui/Empty/Empty';

type FieldType = {
    title?: string;
    content?: string;
    tag?: string;
};

type FormValues = {
    title: string;
    content: string;
    tag: string;
};

type NewsItem = {
    id: number;
    title: string;
    content: string;
    tag: string;
    date?: Date;
};

export const EditNewsPage = memo<any>(() => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    if (!id) {
        return <EmptyMarker />;
    }
    const post = news.find((post) => post.id === parseInt(id));

    if (!post) {
        return <EmptyMarker />;
    }

    const [newsData, setNewsData] = useState<NewsItem>(post);

    const updateNewsAndNavigate = (values: FormValues) => {
        const updatedData: NewsItem = {
            id: Date.now(),
            title: values.title,
            content: values.content,
            tag: values.tag
        };
        news.push(updatedData);
        navigate('/dashboards/posts');
    };

    const onFinish = (values: FormValues) => {
        console.log('Success:', values);
        updateNewsAndNavigate(values);
    };

    const defaultFormValues: FormValues = {
        title: newsData.title,
        content: newsData.content,
        tag: newsData.tag
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                initialValues={defaultFormValues}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Название"
                    name="title"
                    rules={[{ required: true, message: 'Пожалуйста введите название статьи' }]}
                >
                    <Input value={newsData.title} />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Описание"
                    name="content"
                    rules={[{ required: true, message: 'Пожалуйста введите описание статьи' }]}
                >
                    <ReactQuill
                        theme="snow"
                        value={newsData.content}
                        style={{
                            backgroundColor: '#ffffff'
                        }}
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Тэг"
                    name="tag"
                    rules={[{ required: true, message: 'Пожалуйста укажите тэг' }]}
                >
                    <Select
                        value={newsData.tag}
                        options={[
                            { value: 'warning', label: 'Объявление' },
                            { value: 'default', label: 'Новость' }
                        ]}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
});
