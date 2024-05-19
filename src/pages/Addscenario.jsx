import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useContext } from 'react';
import '../index.css'
import ScenarioContext from '../context/ScenarioContex';
function Addscenario() {
    const { scenarios, addScenario } =useContext(ScenarioContext);
    const [scenarioName,setsenarioname]=useState('');
    const [ scenarioTime,setscenariotime]=useState('');
    const [error,setError]=useState(false)
    const id=0;
    const navigate=useNavigate()
    const onSubmit = (e) => {
        e.preventDefault();
        if (scenarioName.trim() === '' || scenarioTime.trim() === '') {
            setError(true);
        } else {
            const id =  scenarios.length+1; 
            const newScenario = {
                id:id,
                name: scenarioName,
                time: scenarioTime,
                vehicles: []
            };
            // ScenarioData.push(newScenario);
            addScenario(newScenario)
            navigate('/all-scenarios');
        }
    };
    const onscenariochange = (e)=>{
                setsenarioname(e.target.value)
    }
    const onscenariotimechange = (e)=>{
              setscenariotime(e.target.value)
    }
  return (
    <div className='addscenario'>
          <h2>Scenario/add</h2>
          <h1>Add Scenario</h1>
          {error && <div className='error'>
                    <h3>Please add all the fields</h3>
            </div>}
          <form className='addscenarioform' onSubmit={onSubmit}>
    <div className='input-fields'>
    <div className='scenarioname'>         
    <label htmlFor="scenario-name">Scenario Name</label>
    <input type='text' className='input' id="scenario-name" onChange={onscenariochange}/>
    </div>
    <div className='scenariotime'>
    <label htmlFor="scenario-time">Scenario Time (seconds)</label>
    <input type='text' className='input' id="scenario-time" onChange={onscenariotimechange}/>
    </div>
    
</div>
<button type="submit" className='submitbutton button-text'>Add</button>
<button type="reset" className='resetbutton button-text'>Reset</button>
<button  className='gobackbutton button-text' onClick={()=>{
       navigate("/home")
}}>
    Go Back
</button>
          </form>
    </div>
  )
}

export default Addscenario
