import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import ScenarioContext from "../context/ScenarioContex";
function Home() {
    const { scenarios } = useContext(ScenarioContext);
    const [selectedScenario, setSelectedScenario] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const vehicleRefs = useRef([]);
  
    useEffect(() => {
      if (selectedScenario) {
        const scenario = scenarios.find((s) => s.name === selectedScenario);
        setVehicles(scenario ? scenario.vehicles : []);
      } else {
        setVehicles([]);
      }
    }, [selectedScenario, scenarios]);
  
    useEffect(() => {
      if (isSimulating) {
        const interval = setInterval(moveVehicles, 100);
        return () => clearInterval(interval);
      }
    }, [isSimulating, vehicles]);
  
    const moveVehicles = () => {
      setVehicles((prevVehicles) => 
        prevVehicles.map((vehicle) => {
          const newVehicle = { ...vehicle };
          switch (vehicle.direction) {
            case 'Towards':
              newVehicle.position.x += vehicle.speed;
              break;
            case 'Backwards':
              newVehicle.position.x -= vehicle.speed;
              break;
            case 'Upwards':
              newVehicle.position.y -= vehicle.speed;
              break;
            case 'Downwards':
              newVehicle.position.y += vehicle.speed;
              break;
            default:
              break;
          }
          return newVehicle;
        })
      );
    };
  
    const startSimulation = () => {
      setIsSimulating(true);
    };
  
    const stopSimulation = () => {
      setIsSimulating(false);
    };
  
    return (
      <div className="content">
        <div className="addscenario">
          <h3>Scenario</h3>
          <select
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(e.target.value)}
            className="input"
          >
            <option value="">Test Scenario</option>
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.name}>
                {scenario.name}
              </option>
            ))}
          </select>
        </div>
        {selectedScenario && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Vehicle Id</th>
                  <th>Vehicle Name</th>
                  <th>Position X</th>
                  <th>Position Y</th>
                  <th>Speed</th>
                  <th>Direction</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle, index) => (
                  <tr key={vehicle.id}>
                    <td>{vehicle.id}</td>
                    <td>{vehicle.name}</td>
                    <td>{vehicle.position.x}</td>
                    <td>{vehicle.position.y}</td>
                    <td>{vehicle.speed}</td>
                    <td>{vehicle.direction}</td>
                    <td>
                      <button>✎</button>
                    </td>
                    <td>
                      <button>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button className="add-button" onClick={startSimulation}>
                Start Simulation
              </button>
              <button className="delete-button" onClick={stopSimulation}>
                Stop Simulation
              </button>
            </div>
          </>
        )}
        <div className="simulation-container">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className="vehicle"
              style={{
                left: `${vehicle.position.x}px`,
                top: `${vehicle.position.y}px`,
                display:
                  vehicle.position.x < 0 ||
                  vehicle.position.x > 800 ||
                  vehicle.position.y < 0 ||
                  vehicle.position.y > 600
                    ? 'none'
                    : 'block',
              }}
            >
              {vehicle.id}
            </div>
          ))}
        </div>
      </div>
    );
}

export default Home
