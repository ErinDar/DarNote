import React from "react";
import { NavLink } from "react-router-dom";
import DarImage from "./assets/Darnote_splash.png"
import NavBar from "./NavBar";
import "./CSS/SplashPage.css"

export default function SplashPage() {
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
                                <NavLink to='/' className="sign-up-button">
                                    Sign up for free
                                </NavLink>
                            </p>
                            <p className="login-second-link">
                                <NavLink to='/' className="login-button">
                                    Already have an account? Log in
                                </NavLink>
                            </p>
                        </div>
                        <div className="splash-highlight">
                            <div className="splash-highlight-image-container">
                                <img className="splash-highlight-image" src={DarImage}></img>
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
                                    <div className="highlight-text-items"></div>
                                    <div className="highlight-text-items"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
