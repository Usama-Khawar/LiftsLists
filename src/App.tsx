import React from 'react'
import Dashboard from './components/Dashboard/Dashboard'
import { LiftProvider } from './context/LiftContext/LiftsContext'

function App() {
  return(
    <LiftProvider>
      <Dashboard />
    </LiftProvider>
  )
}

export default App
