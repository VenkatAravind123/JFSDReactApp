import React from 'react'
import {BrowserRouter as Router,Route,Routes,} from "react-router-dom";
import SideBar from './SideBar';
import Feed from '../pages/Feed';
import Reports from '../pages/Reports';
import FeedBack from '../pages/FeedBack';


function DashBoard() {
  return (
    <div>
     <SideBar/>
    </div>
  )
}

export default DashBoard