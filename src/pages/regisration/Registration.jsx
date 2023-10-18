import React, {useEffect} from 'react';
import {Button, Form, Input} from "antd";
import s from '../../styles/style.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectedIsAuth} from "../../redux/slices/auth";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


export const Registration = () => {

    const dispatch = useDispatch()

    const {status} = useSelector((state) => state.auth)
    const isAuth = useSelector(selectedIsAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (status) {
            toast(status)
        }
        if (isAuth) navigate('/')
    }, [status, isAuth, navigate])

    const [form] = Form.useForm();
    const onFinish = async (values) => {
        const data = await dispatch(fetchRegister(values))
    };

    return (
        <Form
            form={form}
            name="register"
            className={s.formStyles}
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                className={s.input}
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                className={s.input}
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="username"
                label="Username"
                className={s.input}
                rules={[
                    {
                        required: true,
                        message: 'Please input your name',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="position"
                label="Position"
                className={s.input}
                rules={[
                    {
                        message: 'Please input your position!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>

    );
};