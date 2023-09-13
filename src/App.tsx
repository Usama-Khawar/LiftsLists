import React from 'react'
import { useLifts } from './context/LiftContext/LiftsContext'
import style from './App.module.css'
import Lists from './components/Lists/Lists'
import Select from './components/ui/Select/Select'
import Modal from './components/modals/Modal/Modal'
import Spinner from './components/ui/Spinner/Spinner'

function App() {
  const { filteredArr, handleSelectChange, isLoading } = useLifts()

  return (
    <div>
      <Modal />

      <div className={style.App}>
        <div className={style.header}>
          <h3>Lifts Lists</h3>
          <div style={{ textAlign: 'left' }}>
            <h6 style={{ margin: '2px' }}>Filter per status</h6>
            <Select
              handleChange={handleSelectChange}
              options={[
                { value: 'All' },
                { value: 'HOLD' },
                { value: 'CLOSED' },
                { value: 'OPEN' },
              ]}
            />
          </div>
        </div>
      </div>
      <div className={style.List}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Lists lists={filteredArr} disabled={false} />
        )}
      </div>
    </div>
  )
}

export default App
