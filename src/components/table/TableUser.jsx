import React, {useEffect, useState} from 'react';
import {Button, Divider, Radio, Table} from "antd";
import {DeleteOutlined, LockOutlined, UnlockOutlined} from "@ant-design/icons";
import {fetchBlockUsers, fetchUsers} from "../../redux/slices/auth";
import {useDispatch, useSelector} from "react-redux";

const columns = [
    {
        title: 'Name',
        dataIndex: 'username',
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
    },
    {
        title: 'Registration Date',
        dataIndex: 'registrationDate',
    },
    {
        title: 'Last Login',
        dataIndex: 'lastLoginDate',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];

export const TableUser = () => {

    const dispatch = useDispatch()

    const [selectionType, setSelectionType] = useState('checkbox');
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedUserIds(selectedRowKeys);
            setSelectedRows(selectedRows);
        }
    }

    const users = useSelector(state => state.auth.users);

    const usersWithKey = users.map((user) => ({
        ...user,
        key: user._id,
    }));

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    console.log(users)

    const handleDeleteUser = () => {
        console.log('Delete selected user:', selectedRows);
    };
    const handleLockUser = () => {
        console.log('Lock selected user:', selectedUserIds);
        dispatch(fetchBlockUsers(selectedUserIds))
    };
    const handleUnlockUser = () => {
        console.log('Unlock selected user:', selectedRows);
    };

    return (
        <div>
            <div style={{
                width:'200px',
                display:'flex',
                justifyContent:'space-between'
            }}>
                <Button onClick={handleLockUser}><LockOutlined /> Block</Button>
                <Button onClick={handleUnlockUser}><UnlockOutlined /></Button>
                <Button onClick={handleDeleteUser} danger type={'primary'}><DeleteOutlined /></Button>
            </div>
            <Radio.Group
                onChange={({ target: { value } }) => {
                    setSelectionType(value);
                }}
                value={selectionType}
            >
            </Radio.Group>

            <Divider />

            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={usersWithKey}
            />
        </div>
    );

};