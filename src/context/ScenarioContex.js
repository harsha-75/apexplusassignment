import React, { createContext, useState } from "react";

const ScenarioContext = createContext();

export const ScenarioProvider = ({ children }) => {
  const [scenarios, setScenarios] = useState([]);

  // Function to add a new scenario
  const addScenario = (scenario) => {
    setScenarios([...scenarios, scenario]);
  };

  // Function to delete a scenario by ID
  const deleteScenario = (id) => {
    const updatedScenarios = scenarios.filter((scenario) => scenario.id !== id);
    setScenarios(updatedScenarios);
  };

  // Function to delete all scenarios
  const deleteAllScenarios = () => {
    setScenarios([]);
  };

  // Function to add a vehicle to a scenario by scenario ID
  const addVehicle = (scenarioId, vehicle) => {
    const updatedScenarios = scenarios.map((scenario) =>
      scenario.id === scenarioId
        ? { ...scenario, vehicles: [...scenario.vehicles, vehicle] }
        : scenario
    );
    setScenarios(updatedScenarios);
  };

  // Function to edit a scenario by ID
  const editScenario = (id, updatedScenario) => {
    const updatedScenarios = scenarios.map((scenario) =>
      scenario.id === id ? { ...updatedScenario } : scenario
    );
    setScenarios(updatedScenarios);
  };

  return (
    <ScenarioContext.Provider
      value={{
        scenarios,
        addScenario,
        deleteScenario,
        deleteAllScenarios,
        addVehicle,
        editScenario,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
};

export default ScenarioContext;
