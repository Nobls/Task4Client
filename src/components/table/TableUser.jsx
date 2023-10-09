import React, {useState} from 'react';
import {Button, Divider, Radio, Table} from "antd";
import {DeleteOutlined, LockOutlined, UnlockOutlined} from "@ant-design/icons";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
    },
    {
        title: 'Last Login',
        dataIndex: 'lastLogin',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        lastLogin: '01.01.2022',
        email: 'test@gmail.com',
        status: 'Active',
    },
    {
        key: '2',
        name: 'Jim Green',
        lastLogin: '01.01.2022',
        email: 'test@gmail.com',
        status: 'Active',
    },
    {
        key: '3',
        name: 'Jim Green',
        lastLogin: '01.01.2022',
        email: 'test@gmail.com',
        status: 'Active',
    }
];

export const TableUser = () => {

    const [selectionType, setSelectionType] = useState('checkbox');
    const [selectedRows, setSelectedRows] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRows(selectedRows);
        }
    }

    const handleDeleteUser = () => {
        console.log('Delete selected user:', selectedRows);
    };
    const handleLockUser = () => {
        console.log('Lock selected user:', selectedRows);
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
                dataSource={data}
            />
        </div>
    );

};