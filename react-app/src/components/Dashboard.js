import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Sidebar from './SideBar'
import "./CSS/Dashboard.css"

export default function Dashboard() {
    const location = useLocation()
    const body = document.querySelector("body")
    const classes = body.classList

    if (location.pathname === '/dashboard') {
        document.body.classList.remove(...classes)
        document.body.classList.add("dashboard-body")
    }

    return (
        <div className='dashboard'>
            <div className='dashboard-container'>
                <div className='dashboard-holder'>
                    <div className='dashboard-wrapper'>
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}