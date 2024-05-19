import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
function Sidebar() {
    const location=useLocation()
    const navigate=useNavigate()
    const pathmatchroute= (route)=>
  {
    if (route === location.pathname) {
        return true;
      }
      if (route === '/add-vechile' && location.pathname.startsWith('/add-vechile')) {
        return true;
      }
      return false;
  }
  return (
    <div className="sidebar">
      <ul>
        <li className={ pathmatchroute("/home") || pathmatchroute("/") ? 'active' : ''} onClick={() => {
            navigate('/home')
        }}>
          Home
        </li>
        <li className={pathmatchroute("/add-scenario") ? 'active' : ''} onClick={() =>{
              navigate('/add-scenario')
        }}>
          Add Scenario
        </li>
        <li className={ pathmatchroute("/all-scenarios") ? 'active' : ''} onClick={() =>{
              navigate('/all-scenarios')
        }}>
          All Scenarios
        </li>
        <li className={ pathmatchroute("/add-vechile") ? 'active' : ''} onClick={() => {
            navigate('/add-vechile')
        }}>
          Add Vehicle
        </li>
      </ul>
    </div>
  );
  
}

export default Sidebar
