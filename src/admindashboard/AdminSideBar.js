import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import './AdminSideBar.css';
import logo from '../images/jana.png';
import { AdminSideBarData } from './../admindashboard/AdminSideBarData';
import { IconContext } from 'react-icons/lib';

function AdminSideBar() {
    const [sidebar, setSidebar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const TIMEOUT_DURATION = 1 * 60 * 1000; // 5 minutes
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

    const modalStyles = {
        modal: {
            display: showModal ? 'flex' : 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        },
        modalContent: {
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            textAlign: 'center',
            maxWidth: '400px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            color: '#333'
        },
        button: {
            margin: '10px',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        extendButton: {
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none'
        },
        logoutButton: {
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none'
        }
    };

    return (
        <IconContext.Provider value={{color:"#fff"}}>
            <div style={modalStyles.modal}>
                <div style={modalStyles.modalContent}>
                    <h3>Session Timeout Warning</h3>
                    <p>Your session will expire in 30 seconds due to inactivity.</p>
                    <button 
                        style={{...modalStyles.button, ...modalStyles.extendButton}}
                        onClick={extendSession}
                    >
                        Extend Session
                    </button>
                    <button 
                        style={{...modalStyles.button, ...modalStyles.logoutButton}}
                        onClick={logout}
                    >
                        Logout Now
                    </button>
                </div>
            </div>

            <div className='navbar3'>
                <Link to="#" className='menu-bars'>
                    <FaBars onClick={showSidebar}/>
                </Link>
                <h2>Admin Dashboard</h2>
                <button onClick={logout} className='logout2'>Logout</button>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to="#" className='menu-bars'>
                            <AiOutlineClose />
                        </Link>
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
        </IconContext.Provider>
    );
}

export default AdminSideBar;