import SideBar from "./components/sidebar/sidebar";
import { Outlet } from 'react-router-dom';
import './App.css'
import React, {useEffect, useState} from "react";
import ReactModal from "react-modal";
import SideBarModal from "./components/sidebarModal/sideBarModal";
import { useLocation } from 'react-router-dom'

const AppHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const HandleClick = () => {
        setIsSidebarOpen(false)
    }
    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // 現在の状態の反対にする
    };
    return(
        <div className="appHome">
            <div className={`hamburgerMenu ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ReactModal isOpen={isSidebarOpen} onRequestClose={() => setIsSidebarOpen(false)}>
                <SideBarModal 
                HandleClick={HandleClick}/>
            </ReactModal>
            <SideBar className="sidebar"/>
            <Outlet className="mainContent"/>
        </div>
    )
}

export default AppHome;