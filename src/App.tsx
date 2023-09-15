import React from 'react'
import Dashboard from './views/dash-board/dash-board'
import { LiftProvider } from './context/lift-context/lift-context'

function App() {
  return (
    <LiftProvider>
      <Dashboard />
    </LiftProvider>
  )
}

export default App
