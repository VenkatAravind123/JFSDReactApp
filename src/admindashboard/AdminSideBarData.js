import { MdBugReport, MdFeed, MdManageAccounts, MdOutlineFeedback } from "react-icons/md";
import React from 'react'
import { FaBars } from "react-icons/fa6";
import { AiFillHome, AiOutlineClose } from "react-icons/ai";





export const AdminSideBarData = [
    
    {
        title:'Feed',
        path:'/admindashboard/feed',
        icon:<MdFeed/>,
        cName:'admin-nav-text'
    },
    {
        title:'Manage',
        path:'/admindashboard/manage',
        icon:<MdManageAccounts />,
        cName:'admin-nav-text'
    },
    

]