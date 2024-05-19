import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ScenarioContext from '../context/ScenarioContex';
import ScenarioData from '../data/scenerio';
function Allscenario() {
    const navigate = useNavigate();

    const {scenarios,deleteScenario,
        deleteAllScenarios,} =useContext(ScenarioContext)
       
    const handleAddVehicle = (id) => {
        navigate(`/add-vechile`);
    };
    const handleEditScenario = (id) => {
      navigate(`/edit-scenario/${id}`);
    };
    const handleDeleteScenario = (id) => {
           deleteScenario(id)
    };
  
    const handleDeleteAll = () => {
         deleteAllScenarios()
    };
  
  return (
    <div className="all-scenarios">
           
            <div className='scenarioheader'>
            <h2>All Scenarios</h2>
                <div className='scenarioheaderbuttons'> 
                <button onClick={() => navigate('/add-scenario')} className="add-button">New Scenario</button>
                <button onClick={() => navigate('/add-vechile')} className="add-vechile-button">Add Vehicle</button>
                <button onClick={handleDeleteAll} className="delete-button">Delete All</button>
                </div>
            </div>
            {scenarios.length > 0 ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Scenario Id</th>
                                <th>Scenario Name</th>
                                <th>Scenario Time</th>
                                <th>Number of Vehicles</th>
                                <th>Add Vehicle</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scenarios.map((sce) => (
                                <tr key={sce.id}>
                                    <td>{sce.id}</td>
                                    <td>{sce.name}</td>
                                    <td>{sce.time}</td>
                                    <td>{sce.vehicles.length}</td>
                                    <td>
                                        <button onClick={() => handleAddVehicle(sce.id)}>+</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleEditScenario(sce.id)}>✎</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteScenario(sce.id)}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <h1>No scenarios present</h1>
                    <h2>Start by creating a new scenario</h2>
                </div>
            )}
        </div>
  )
}

export default Allscenario
