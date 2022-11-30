import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import letterArray from './Letters'
import imagesArray from './LetterProfile'
import "./CSS/Sidebar.css"

export default function Sidebar() {
    const user = useSelector(state => state.session.user)

    let profilePic;
    if (user) {
        const firstLetter = user.first_name.split("")[0]
        const index = letterArray.indexOf(firstLetter)
        profilePic = imagesArray[index]
    }

    return (
        <div className='sidebar-container'>
            <div className='sidebar-holder'>
                <nav className='sidebar'>
                    <div className='sidebar-wrapper'>
                        <ul className='sidebar-list'>
                            <li className='sidebar-top-section'>
                                <div className='sidebar-user-section'>
                                    <span className='user-name-section'>
                                        <span className='user-image-holder'>
                                            <div className='user-image' style={{ backgroundImage: `url(${profilePic})` }}></div>
                                        </span>
                                        <div className='user-name-holder'>
                                            <div className='user-name-wrapper'>
                                                <div className='user'>
                                                    {user.first_name} {user.last_name}
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox='0 0 8 8' className='evernote-svg'>
                                                    <path fill="none" d="M7 2L4 5 1 2"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </li>
                            <li className='sidebar-search-new-section'>
                                <div className='sidebar-search-container'>
                                    <div className='sidebar-search-wrapper'>
                                        <div className='sidebar-search'>
                                            <svg className='search-mag-glass' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M13.959 15.127c-2.294 1.728-5.577 1.542-7.68-.556-2.303-2.297-2.318-6.02-.034-8.312 2.285-2.293 6.004-2.29 8.307.009 2.103 2.097 2.299 5.381.579 7.682a.86.86 0 01.055.05l4.028 4.035a.834.834 0 01-1.179 1.179l-4.028-4.035a.869.869 0 01-.048-.052zm-.553-1.725c-1.63 1.635-4.293 1.641-5.95-.012s-1.66-4.318-.03-5.954c1.629-1.635 4.293-1.64 5.95.013 1.657 1.653 1.659 4.318.03 5.953z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <form role="Search">
                                                <input
                                                    className='search-bar'
                                                    autoComplete='off'
                                                    placeholder='Search'
                                                    type='text'
                                                />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className='search-drop-down-hidden'>
                                    <div className='search-dropdown-container'>
                                        <div className='search-dropdown-wrapper'>
                                            <svg className='dropdown-mag-glass' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M13.959 15.127c-2.294 1.728-5.577 1.542-7.68-.556-2.303-2.297-2.318-6.02-.034-8.312 2.285-2.293 6.004-2.29 8.307.009 2.103 2.097 2.299 5.381.579 7.682a.86.86 0 01.055.05l4.028 4.035a.834.834 0 01-1.179 1.179l-4.028-4.035a.869.869 0 01-.048-.052zm-.553-1.725c-1.63 1.635-4.293 1.641-5.95-.012s-1.66-4.318-.03-5.954c1.629-1.635 4.293-1.64 5.95.013 1.657 1.653 1.659 4.318.03 5.953z" fill="currentColor"></path>
                                            </svg>
                                            <form role='Search'>
                                                <input className='search-dropdown-bar'></input>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className='sidebar-new-container'>
                                    <div className='sidebar-new-wrapper'>
                                        <button className='sidebar-new-button'>
                                            <svg className='new-create-icon' width="24" height="24" fill='none' xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12 5.333a.833.833 0 00-.833.834v5h-5a.833.833 0 100 1.666h5v5a.833.833 0 001.666 0v-5h5a.833.833 0 000-1.666h-5v-5A.833.833 0 0012 5.333z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <div className='new-button-name'>New</div>
                                        </button>
                                        <svg className='new-button-arrow' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox='0 0 8 8'>
                                            <path fill="none" d="M7 2L4 5 1 2"></path>
                                        </svg>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}