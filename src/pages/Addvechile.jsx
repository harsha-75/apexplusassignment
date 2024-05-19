import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../addvechile.css';
import ScenarioContext from '../context/ScenarioContex';

function Addvechile() {
  const { scenarios, addVehicle } = useContext(ScenarioContext);
  const [scenario, setScenario] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');
  const [speed, setSpeed] = useState('');
  const [direction, setDirection] = useState('');
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();
  const { scenarioId } = useParams();

  useEffect(() => {
    if (scenarioId) {
      const selectedScenario = scenarios.find(s => s.id === parseInt(scenarioId));
      if (selectedScenario) {
        setScenario(selectedScenario.name);
      }
    }
  }, [scenarioId, scenarios]);

  useEffect(() => {
    if (formError) {
      const timer = setTimeout(() => {
        setFormError('');
      }, 3000); // Error message will disappear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [formError]);

  const validatePositionX = (x) => {
    const numX = Number(x);
    if (numX > 800 || numX < 0) {
      setError('Position X should not be > 800 and < 0');
    } else {
      setError('');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!scenario || !vehicleName || !positionX || !positionY || !speed || !direction) {
      setFormError('All fields are required.');
      return;
    }
    const selectedScenario = scenarios.find(s => s.name === scenario);
    const newVehicle = {
      id: selectedScenario.vehicles.length,
      name: vehicleName,
      position: {
        x: Number(positionX),
        y: Number(positionY),
      },
      speed: Number(speed),
      direction: direction,
    };
    addVehicle(selectedScenario.id, newVehicle);
    navigate("/all-scenarios");
  };

  return (
    <div className="add-vehicle">
      <h2>Vehicle / Add</h2>
      <h2>Add Vehicle</h2>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="scenario">Scenarios List</label>
          <select id="scenario" value={scenario} onChange={(e) => setScenario(e.target.value)}>
            <option value="">Select Scenario</option>
            {scenarios.map(scenario => (
              <option key={scenario.id} value={scenario.name}>{scenario.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="vehicle-name">Vehicle Name</label>
          <input
            type="text"
            id="vehicle-name"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position-x">Position X</label>
          <input
            type="number"
            id="position-x"
            value={positionX}
            onChange={(e) => {
              setPositionX(e.target.value);
              validatePositionX(e.target.value);
            }}
            className={error ? 'error' : ''}
          />
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="position-y">Position Y</label>
          <input
            type="number"
            id="position-y"
            value={positionY}
            onChange={(e) => setPositionY(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="speed">Speed</label>
          <input
            type="number"
            id="speed"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="direction">Direction</label>
          <select
            id="direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="">Select Direction</option>
            <option value="Towards">Towards</option>
            <option value="Backwards">Backwards</option>
            <option value="Upwards">Upwards</option>
            <option value="Downwards">Downwards</option>
          </select>
        </div>

        {formError && <div className="error-message">{formError}</div>}

        <div className="form-actions">
          <button type="submit" className="addbutton">Add</button>
          <button type="reset" className="reset-button" onClick={() => {
            setScenario('');
            setVehicleName('');
            setPositionX('');
            setPositionY('');
            setSpeed('');
            setDirection('');
            setError('');
            setFormError('');
          }}>Reset</button>
          <button type="button" className="goback-button" onClick={() => navigate('/home')}>Go Back</button>
        </div>
      </form>
    </div>
  );
}

export default Addvechile;
