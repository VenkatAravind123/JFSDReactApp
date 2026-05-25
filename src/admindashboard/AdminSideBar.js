import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import './AdminSideBar.css';
import { AdminSideBarData } from './../admindashboard/AdminSideBarData';
import { IconContext } from 'react-icons/lib';

function AdminSideBar() {
    const [sidebar, setSidebar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const TIMEOUT_DURATION = 5 * 60 * 1000; // 5 minutes
    const WARNING_DURATION = 30 * 1000; // 30 seconds warning
    const timeoutIdRef = useRef();
    const warningTimeoutIdRef = useRef();

    const logout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('admin');
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }
        if (warningTimeoutIdRef.current) {
            clearTimeout(warningTimeoutIdRef.current);
        }
        navigate('/adminlogin');
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
            {showModal && (
                <div className='admin-modal-overlay'>
                    <div className='admin-modal-content'>
                        <h3>Session Timeout Warning</h3>
                        <p>Your session will expire in 30 seconds due to inactivity.</p>
                        <div className='admin-modal-btn-group'>
                            <button 
                                className='admin-modal-btn admin-modal-btn-extend'
                                onClick={extendSession}
                            >
                                Extend Session
                            </button>
                            <button 
                                className='admin-modal-btn admin-modal-btn-logout'
                                onClick={logout}
                            >
                                Logout Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className='admin-navbar3'>
                <button type='button' className='admin-menu-bars' onClick={showSidebar} >
                    <FaBars style={{ color: '#00236f' }}  />
                </button>
                <h2>Admin Dashboard</h2>
                <button onClick={logout} className='admin-logout2'>Logout</button>
            </div>
            <nav className={sidebar ? 'admin-nav-menu active' : 'admin-nav-menu'}>
                <ul className='admin-nav-menu-items' onClick={showSidebar}>
                    <li className='admin-navbar-toggle'>
                        <button type='button' className='admin-menu-bars' style={{ color: '#94a3b8' }}>
                            <AiOutlineClose />
                        </button>
                    </li>
                    {AdminSideBarData.map((item, index) => {
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
            {sidebar && (
                <div 
                    className="admin-sidebar-backdrop" 
                    onClick={showSidebar} 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(11, 19, 41, 0.4)',
                        zIndex: 99,
                        backdropFilter: 'blur(4px)',
                        animation: 'fadeInModal 0.25s ease-out'
                    }} 
                />
            )}
        </IconContext.Provider>
    );
}

export default AdminSideBar;