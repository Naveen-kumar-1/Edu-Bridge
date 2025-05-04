import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../../../Components/Admin/NavBar/NavBar';
import './DashBoard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  useEffect(()=>{
      navigate('/dashboard/homepage/')
  },[])

  return (
    <div>
      <NavBar/>
      <div className='ed-dashboard-container'>
        <div className='ed-dashboard-sidebar'>
          <ul className='ed-dashboard-sidebar-navlinks'>
            <NavLink to='/dashboard/homepage/' className='ed-dashboard-sidebar-navlink'><i class='bx bxs-dashboard' ></i>Dashboard</NavLink>
            <NavLink to='/dashboard/students/' className='ed-dashboard-sidebar-navlink'><i class='bx bxs-graduation'></i>Students</NavLink>
            <NavLink to='/dashboard/staffs/' className='ed-dashboard-sidebar-navlink'><i class='bx bx-user' ></i>Staffs</NavLink>
            <NavLink to='/dashboard/events/' className='ed-dashboard-sidebar-navlink'><i class='bx bx-calendar' ></i>Events</NavLink>
            <NavLink to='/dashboard/posts/' className='ed-dashboard-sidebar-navlink'><i class='bx bx-images'></i>Posts</NavLink>
            <NavLink to='/dashboard/settings/' className='ed-dashboard-sidebar-navlink'><i class='bx bx-cog' ></i>Settings</NavLink>
          </ul>
        </div>
        <div className='ed-dashboard-display-content'>
        <Outlet/>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
