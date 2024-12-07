import React from 'react'
import { FaBars,CgProfile } from "react-icons/cg";
import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import { MdBugReport, MdFeed, MdOutlineFeedback } from "react-icons/md";
import { RiGovernmentFill } from 'react-icons/ri';


export const SideBarData = [
    
    {
        title:'Feed',
        path:'/citizendashboard/feed',
        icon:<MdFeed/>,
        cName:'nav-text'
    },
    {
        title:'Profile',
        path:'/citizendashboard/profile',
        icon:<CgProfile />,
        cName:'nav-text'
    },
    {
        title:'Government Schemes',
        path:'/citizendashboard/schemes',
        icon:<RiGovernmentFill/>,
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