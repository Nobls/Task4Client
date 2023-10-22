import React, {useEffect} from 'react';
import {Button, Layout, theme} from 'antd';
import {Link, Outlet} from "react-router-dom";
import {User} from "../user/User";
import {useSelector} from "react-redux";
import {selectedIsAuth} from "../../redux/slices/auth";

const {Header, Content, Footer} = Layout;

export const LayoutPage = () => {

    const isAuth = useSelector(selectedIsAuth)

    const userData = useSelector((state)=> state.auth.data)

    const status = useSelector((state) => state.auth.status)

    useEffect(()=>{

    }, [status])

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout className="layout">
            <Header style={{
                backgroundColor: 'slategray',
            }}>
                <div style={{display: "flex", justifyContent:'flex-end', alignItems:'center'}}>
                    <div style={{fontSize:'20px', marginRight:'5px'}}>Hello,</div>
                    {
                        isAuth && status !== 'Такого юзера не существует.' ? <User userData={userData}/> : <Button type={'default'}>{<Link to={'/login'}>Войти</Link>}</Button>
                    }
                </div>
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                    margin: '50px 0'
                }}
            >

                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                        display: 'flex',
                        height: '650px',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Outlet/>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Footer
            </Footer>
        </Layout>
    );
};