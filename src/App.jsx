import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {LayoutPage} from "./components/layout/Layout";
import {Login} from "./pages/lodin/Login";
import {Registration} from "./pages/regisration/Registration";
import {Home} from "./pages/home/Home";

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<LayoutPage/>}>
                <Route index element={<Login/>}/>
                <Route path='registration' element={<Registration/>}/>
                <Route path='home' element={<Home/>}/>
            </Route>
        )
    )

    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
