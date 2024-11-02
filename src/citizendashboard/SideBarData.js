import React from 'react'
import { FaBars } from "react-icons/fa6";
import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import { MdBugReport, MdFeed, MdOutlineFeedback } from "react-icons/md";


export const SideBarData = [
    
    {
        title:'Feed',
        path:'/citizendashboard/feed',
        icon:<MdFeed/>,
        cName:'nav-text'
    },
    {
        title:'Report',
        path:'/citizendashboard/reports',
        icon:<MdBugReport/>,
        cName:'nav-text'
    },
    {
        title:'Feedback',
        path:'/citizendashboard/feedback',
        icon:<MdOutlineFeedback/>,
        cName:'nav-text'
    },

]