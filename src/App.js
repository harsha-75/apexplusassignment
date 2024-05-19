import React from 'react'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Addscenario from './pages/Addscenario'
import Allscenario from './pages/Allscenario'
import Addvechile from './pages/Addvechile'
import { ScenarioProvider } from './context/ScenarioContex'
function App() {
  return (
    <ScenarioProvider>
         <Router>
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/add-scenario' element={<Addscenario />} />
          <Route path='/all-scenarios' element={<Allscenario />} />
          <Route path='/add-vechile' element={<Addvechile />} />
        </Routes>
      </div>
    </Router>
    </ScenarioProvider>
  )
}

export default App
