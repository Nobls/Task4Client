import React from 'react';
import {TableUser} from "../../components/table/TableUser";
import {useSelector} from "react-redux";
import {selectedIsAuth} from "../../redux/slices/auth";

export const Home = () => {

    const isAuth = useSelector(selectedIsAuth)

    return (
        <div>
            { isAuth ?  <TableUser/> : <div>Авторизуйтесь</div>}
        </div>
    );
};
