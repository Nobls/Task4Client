import React from 'react';
import {Button} from "antd";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../../redux/slices/auth";

export const User = ({userData}) => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onClickLogout = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div style={{fontSize:'20px'}}>
            {userData.username}
            <Button style={{marginLeft:'10px'}} type={'default'} onClick={onClickLogout}>Logout</Button>
        </div>
    );
};