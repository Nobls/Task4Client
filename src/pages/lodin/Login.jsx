import React, {useEffect} from 'react';
import {Button, Form, Input} from "antd";
import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom";
import s from '../../styles/style.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin, selectedIsAuth} from "../../redux/slices/auth";
import {toast} from "react-toastify";

export const Login = () => {

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

    const onFinish = async (values) => {
        const data = await dispatch(fetchLogin(values))
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
                name="email"
                className={s.input}
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon"/>} placeholder="E-mail"/>
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