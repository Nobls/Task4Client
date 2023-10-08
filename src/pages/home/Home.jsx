import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button} from "antd";
import {TableUser} from "../../components/table/TableUser";

export const Home = () => {

    const [auth, setAuth] = useState(true)

    return (
        <div>
            { auth ?  <TableUser/> : <Button type={"primary"} size='large'>{<Link to={'/login'}>Login</Link>}</Button>}
        </div>
    );
};
