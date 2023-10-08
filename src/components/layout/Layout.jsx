import React from 'react';
import {Layout, Menu, theme} from 'antd';
import {Link, Outlet} from "react-router-dom";

const {Header, Content, Footer} = Layout;

export const LayoutPage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="layout">
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}
            >
                <div className="demo-logo">{<Link to={'/'}>Home</Link>}</div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    /*items={}*/
                />
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