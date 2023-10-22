import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {LayoutPage} from "./components/layout/LayoutPage";
import {Login} from "./pages/lodin/Login";
import {Registration} from "./pages/regisration/Registration";
import {Home} from "./pages/home/Home";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<LayoutPage/>}>
                <Route index element={<Home/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='registration' element={<Registration/>}/>
            </Route>
        )
    )

    return (
        <div className="App">
            <RouterProvider router={router}/>
            <ToastContainer position='bottom-right'/>
        </div>
    );
}

export default App;
