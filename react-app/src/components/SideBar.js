import React from 'react'
import { NavLink } from 'react-router-dom'
import "./CSS/Sidebar.css"

export default function Sidebar() {
    return (
        <div className='sidebar-container'>
            <div className='sidebar-holder'>
                <nav className='sidebar'>
                    <div className='sidebar-wrapper'>
                        <ul className='sidebar-list'>
                            <li className='sidebar-top-section'>
                                <div className='sidebar-user-section'>
                                    <span className='user-name-section'>
                                        <div className='user-name-holder'>
                                            <div className='user-name-wrapper'>
                                                <div className='user'>
                                                    Erin Dar
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}