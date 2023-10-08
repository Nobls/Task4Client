import React from 'react';
import {Button, Form, Input} from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import s from '../../styles/style.module.scss'

export const Login = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <Form
            name="normal_login"
            className={s.formStyles}
            initialValues={{
                remember: false,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                className={s.input}
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
            </Form.Item>
            <Form.Item
                name="password"
                className={s.input}
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button
                    style={{
                        marginRight:'20px'
                    }}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button">
                    Log in
                </Button>

                Or <Link
                style={{
                    marginLeft:'5px'
                }}
                to={'/registration'}
                href="">register now!
            </Link>
            </Form.Item>
        </Form>
    );
};