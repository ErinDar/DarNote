import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import DarImage from "./assets/Darnote_splash.png"
import NavBar from "./NavBar";
import "./CSS/SplashPage.css"

export default function SplashPage() {
    const location = useLocation()
    const body = document.querySelector("body")
    const classes = body.classList

    if (location.pathname === "/") {
        document.body.classList.remove(...classes)
        document.body.classList.add("splash-body")
    }

    return (
        <>
            <NavBar />
            <div className="main-splash-container">
                <div className="main-splash-wrapper">
                    <div className="splash-wrapper">
                        <div className="top-main-splash">
                            <h1 className="top-main-heading">Tame your work, organize your life</h1>
                            <div className="tag-line">
                                Remember everything and tackle any project with your notes, tasks, and schedule all in one place.
                            </div>
                            <p className="sign-up-link">
                                <NavLink to='/sign-up' className="sign-up-button">
                                    Sign up for free
                                </NavLink>
                            </p>
                            <p className="login-second-link">
                                <NavLink to='/login' className="login-button">
                                    Already have an account? Log in
                                </NavLink>
                            </p>
                        </div>
                        <div className="splash-highlight">
                            <div className="splash-highlight-image-container">
                                <img className="splash-highlight-image" src={DarImage} alt="Darnote preview screenshot"></img>
                            </div>
                            <div className="highlight-text-container">
                                <div className="highlight-text">
                                    <div className="highlight-text-items">
                                        <div className="text-title-container">
                                            <p className="text-title">WORK ANYWHERE</p>
                                        </div>
                                        <div className="highlight-description">
                                            <p className="highlight-description-text">Keep important info handy— your notes sync automatically to all your devices.</p>
                                        </div>
                                    </div>
                                    <div className="highlight-text-items">
                                        <div className="text-title-container">
                                            <p className="text-title">REMEMBER EVERYTHING</p>
                                        </div>
                                        <div className="highlight-description">
                                            <p className="highlight-description-text">Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</p>
                                        </div>
                                    </div>
                                    <div className="highlight-text-items">
                                        <div className="text-title-container">
                                            <p className="text-title">TURN TO-DO INTO DONE</p>
                                        </div>
                                        <div className="highlight-description">
                                            <p className="highlight-description-text">Bring your notes, tasks, and schedules together to get things done more easily.</p>
                                        </div>
                                    </div>
                                    <div className="highlight-text-items">
                                        <div className="text-title-container">
                                            <p className="text-title">FIND THINGS FAST</p>
                                        </div>
                                        <div className="highlight-description">
                                            <p className="highlight-description-text">Get what you need, when you need it with powerful, flexible search capabilities.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="darnote-footer">
                <nav className="footer-nav-bar">
                    <div className="nav-bar footer-logo">
                        <div className="logo-footer"></div>
                    </div>
                    <div className="nav-bar footer-links">
                        <div className="footer-link-section">
                            <p className="section-header">Features</p>
                            <ul>
                                <li>
                                    <NavLink to='/' className="section-link">Create notebooks to organize notes and task list</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/' className="section-link">Create and manage notes and task list</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/' className="section-link">Create tags to categorize notebooks, notes, and task list</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/' className="section-link">Add images and sketches to personalize notes</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-link-section">
                            <p className="section-header">Contact</p>
                            <ul>
                                <li>
                                    <NavLink to="https://github.com/ErinDar" className="section-link">GitHub</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-link-section">
                            <p className="section-header">Technologies</p>
                        </div>
                    </div>
                </nav>
            </footer>
        </>
    )
}
