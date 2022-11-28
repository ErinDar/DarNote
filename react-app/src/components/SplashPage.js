import React from "react";
import { NavLink } from "react-router-dom";
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
                    </div>
                </div>
            </div>
        </>
    )
}
