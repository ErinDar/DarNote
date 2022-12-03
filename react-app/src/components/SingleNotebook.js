import React from "react";
import Sidebar from "./SideBar";
import { useLocation, useParams } from "react-router-dom";


export default function TargetNotebook() {
    const location = useLocation()
    const body = document.querySelector("body")
    const classes = body.classList

    if (location.pathname) {
        document.body.classList.remove(...classes)
        document.body.classList.add("target-notebook-page")
    }

    return (
        <>
            <div className="notebooks-view-page">
                <div className="notebook-view-container">
                    <div className="notebook-view-wrapper">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </>
    )
}