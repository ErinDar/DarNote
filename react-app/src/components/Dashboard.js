import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Sidebar from './SideBar'
import background from './assets/dashboard-image.png'
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
                        <div className='dashboard-main-body'>
                            <div className='main-body-container'>
                                <div className='top-main-body'>
                                    <div className='main-body-header'>
                                        <div className='main-header-image' style={{ backgroundImage: `url(${background})` }}></div>
                                    </div>
                                </div>
                                <div className='lower-main-body'>
                                    <div className='dashboard-components-grid'>
                                        <div className='notes-dashboard-quad'>
                                            <article className='notes-quad-container'>
                                                <section className='notes-quad-header'>
                                                    <div className='notes-quad-title-container'>
                                                        <button className='notes-view-button'>
                                                            <h2 className='notes-view-title'>notes</h2>
                                                            <svg className='notes-view-icon' xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox='0 0 8 8'>
                                                                <g fill="none" fill-rule="evenodd">
                                                                    <path d="M0 0h8v8H0z" />
                                                                    <path stroke="#1191f6" d="M2.5 1.5l3 3-3 3" />
                                                                </g>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </section>
                                                <section className='notes-quad-body'>
                                                    <div className='notes-quad-container'>
                                                        <div className='notes-container'>
                                                            <div className='notes-wrapper'>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}