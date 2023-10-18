import React, {useEffect, useState} from 'react';
import {TableUser} from "../../components/table/TableUser";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, selectedIsAuth} from "../../redux/slices/auth";

export const Home = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector(selectedIsAuth)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(fetchAuthMe())
            .then(() => setLoading(false))
    }, [dispatch])

    if (loading) {
        return <div>Загрузка...</div>
    }

    return (
        <div>
            { isAuth ?  <TableUser/> : <div>Авторизуйтесь</div>}
        </div>
    );
};
