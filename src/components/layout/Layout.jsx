import React from 'react';
import {Layout, Menu, theme} from 'antd';
import {Link, Outlet} from "react-router-dom";
import {User} from "../user/User";

const {Header, Content, Footer} = Layout;

export const LayoutPage = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout className="layout">
            <Header style={{
                backgroundColor: 'slategray',
            }}>
                <div style={{display: "flex", justifyContent:'flex-end'}}>
                    <div style={{fontSize:'20px', marginRight:'5px'}}>Hello,</div>
                    <User/>
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