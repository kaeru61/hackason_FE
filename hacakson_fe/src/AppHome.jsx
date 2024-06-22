import SideBar from "./components/sidebar/sidebar";
import { Outlet } from 'react-router-dom';
import './App.css'

const AppHome = () => {
    return(
        <div className="appHome">
            <SideBar className="sidebar"/>
            <Outlet className="mainContent"/>
        </div>
    )
}

export default AppHome;