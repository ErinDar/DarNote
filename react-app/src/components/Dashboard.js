import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Sidebar from './SideBar'
import background from './assets/dashboard-image.png'
import "./CSS/Dashboard.css"
import { useSelector } from 'react-redux'

export default function Dashboard() {
    const task = useSelector(state => state.task)
    const [haveTask, setHaveTask] = useState(false)
    const location = useLocation()
    const body = document.querySelector("body")
    const classes = body.classList

    if (location.pathname === '/dashboard') {
        document.body.classList.remove(...classes)
        document.body.classList.add("dashboard-body")
    }

    if (task) {
        setHaveTask(true)
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
                                        <div className='task-dashboard-quad'>
                                            <article className='task-quad-container'>
                                                <section className='task-quad-header'>
                                                    <div className='task-quad-title-container'>
                                                        <button className='task-view-button'>
                                                            <h2 className='task-view-title'>my tasks</h2>
                                                            <svg className='task-view-icon' xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox='0 0 8 8'>
                                                                <g fill="none" fill-rule="evenodd">
                                                                    <path d="M0 0h8v8H0z" />
                                                                    <path stroke="#1191f6" d="M2.5 1.5l3 3-3 3" />
                                                                </g>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </section>
                                                <section className='task-quad-body'>
                                                    <div className='task-quad-container'>
                                                        {/* if there are no task */}
                                                        <div className='task-quad-wrapper'>
                                                            <p className='empty-task-message'>Add tasks to any note and prioritize them with due dates and tags</p>
                                                            <div className='empty-new-task-button-container'>
                                                                <div className='empty-new-task-button-wrapper'>
                                                                    <button className='empty-new-task-button'>
                                                                        <span className='empty-new-task-button-title'>Add new task</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* end if there are not task */}
                                                    </div>
                                                </section>
                                            </article>
                                        </div>
                                        <div className='tags-dashboard-quad'>
                                            <article className='tags-quad-container'>
                                                <section className='tags-quad-header'>
                                                    <div className='tags-quad-title-container'>
                                                        <button className='tags-view-button'>
                                                            <h2 className='tags-view-title'>tags</h2>
                                                            <svg className='task-view-icon' xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox='0 0 8 8'>
                                                                <g fill="none" fill-rule="evenodd">
                                                                    <path d="M0 0h8v8H0z" />
                                                                    <path stroke="#1191f6" d="M2.5 1.5l3 3-3 3" />
                                                                </g>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </section>
                                                <section className='tags-quad-body'>
                                                    <div className='tags-quad-container'>
                                                        <div className='tags-quad-wrapper'>
                                                            <p className='empty-tags-message'>Tag notes with keywords to make them easier to find.</p>
                                                            <div className='empty-new-tags-button-container'>
                                                                <div className='empty-new-tags-button-wrapper'>
                                                                    <button className='empty-new-tags-button'></button>
                                                                </div>
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