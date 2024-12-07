import { MdBugReport, MdFeed, MdOutlineFeedback } from "react-icons/md";
import React from 'react'
import { FaSignsPost } from "react-icons/fa6"
import { RiGovernmentFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

export const SideBarData = [
    
    {
        title:'PoliticianFeed',
        path:'/politiciandashboard/feed',
        icon:<MdFeed/>,
        cName:'nav-text'
    },
    {
        title:'Profile',
        path:'/politiciandashboard/profile',
        icon:<CgProfile/>,
        cName:'nav-text'
    },
    {
        title:'Government Schemes',
        path:'/politiciandashboard/schemes',
        icon:<RiGovernmentFill />,
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