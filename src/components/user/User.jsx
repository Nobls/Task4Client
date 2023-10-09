import React from 'react';
import {Button} from "antd";

export const User = () => {
    return (
        <div style={{fontSize:'20px'}}>
            User
            <Button style={{marginLeft:'10px'}} type={'default'}>Logout</Button>
        </div>
    );
};