import { memo, useState } from 'react';
import ReactQuill from 'react-quill';
import { Button, Form, Input, Select } from 'antd';

import 'react-quill/dist/quill.snow.css';
import { news } from 'mockData';
import { useNavigate } from 'react-router-dom';

type FieldType = {
    title?: string;
    content?: string;
    tag?: string;
    date?: Date;
};

export const CreateNewsPage = memo<any>(() => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Success:', values);
        const updatedData = {
            id: Date.now(),
            title: values.title,
            content: values.content,
            tag: values.tag
        };
        news.push(updatedData);
        navigate('/dashboards/posts');
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Название"
                    name="title"
                    rules={[{ required: true, message: 'Пожалуйста введите название статьи' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType> label="Описание" name="content">
                    <ReactQuill
                        theme="snow"
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
