import { MdBugReport, MdFeed, MdOutlineFeedback } from "react-icons/md";
import React from 'react'
import { FaSignsPost } from "react-icons/fa6";

export const SideBarData = [
    
    {
        title:'PoliticianFeed',
        path:'/politiciandashboard/feed',
        icon:<MdFeed/>,
        cName:'nav-text'
    },
    {
        title:'PoliticianReport',
        path:'/politiciandashboard/reports',
        icon:<MdBugReport/>,
        cName:'nav-text'
    },
    {
        title:'MyRating',
        path:'/politiciandashboard/rating',
        icon:<MdOutlineFeedback/>,
        cName:'nav-text'
    },
    {
        title:'MyPosts',
        path:'/politiciandashboard/posts',
        icon:<FaSignsPost />,
        cName:'nav-text'
    }

]