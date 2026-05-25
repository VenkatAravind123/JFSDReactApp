import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink ,Link, useNavigate } from 'react-router-dom';
import './SideBar.css';
import mylogo from '../images/jana.png';
import { SideBarData } from './SideBarData';
import { IconContext } from 'react-icons/lib';
import Cookies from 'js-cookie';

function SideBar() {
    const [sidebar, setSidebar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const TIMEOUT_DURATION = 2 * 60 * 1000; // 5 minutes
    const WARNING_DURATION = 30 * 1000; // 30 seconds warning
    const timeoutIdRef = useRef();
    const warningTimeoutIdRef = useRef();

    const logout = () => {
        localStorage.removeItem('isCitizenLoggedIn');
        Cookies.remove('citizenToken');
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }
        if (warningTimeoutIdRef.current) {
            clearTimeout(warningTimeoutIdRef.current);
        }
        navigate('/citizen');
        window.location.reload();
    };

    useEffect(() => {
        const resetSessionTimer = () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
            if (warningTimeoutIdRef.current) {
                clearTimeout(warningTimeoutIdRef.current);
            }
            
            warningTimeoutIdRef.current = setTimeout(() => {
                setShowModal(true);
            }, TIMEOUT_DURATION - WARNING_DURATION);

            timeoutIdRef.current = setTimeout(logout, TIMEOUT_DURATION);
        };

        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        
        const activityHandler = () => {
            if (!showModal) {
                resetSessionTimer();
            }
        };

        resetSessionTimer();

        events.forEach(event => {
            window.addEventListener(event, activityHandler);
        });

        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
            if (warningTimeoutIdRef.current) {
                clearTimeout(warningTimeoutIdRef.current);
            }
            events.forEach(event => {
                window.removeEventListener(event, activityHandler);
            });
        };
    }, [showModal, logout]);

    const extendSession = () => {
        setShowModal(false);
    };

    const showSidebar = () => {
        setSidebar(!sidebar);
    };

    return (
        <IconContext.Provider value={{color:"#fff"}}>
            <div className="session-modal-overlay" style={{ display: showModal ? 'flex' : 'none' }}>
                <div className="session-modal-content">
                    <h3>Session Timeout Warning</h3>
                    <p>Your session will expire in 30 seconds due to inactivity.</p>
                    <button 
                        className="session-btn session-btn-extend"
                        onClick={extendSession}
                    >
                        Extend Session
                    </button>
                    <button 
                        className="session-btn session-btn-logout"
                        onClick={logout}
                    >
                        Logout Now
                    </button>
                </div>
            </div>

            <div className='navbar1'>   
                <div className='logo-section'>
                    <Link to="#" className='menu-bars'>
                        <FaBars onClick={showSidebar}/> 
                    </Link>
                    <img src={mylogo} alt="Logo" className="citizen-logo" />
                    <h3>Citizen Dashboard</h3>
                </div>
                <button onClick={logout} className='logout1'>Logout</button>
            </div>
            <nav className={sidebar ? 'citizen-nav-menu active' : 'citizen-nav-menu'}>
                <ul className='citizen-nav-menu-items' onClick={showSidebar}>
                    <li className='citizen-navbar-toggle'>
                        <Link to="#" className='menu-bars'>
                            <AiOutlineClose />
                        </Link>
                    </li>
                    {SideBarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
    );
}

export default SideBar;