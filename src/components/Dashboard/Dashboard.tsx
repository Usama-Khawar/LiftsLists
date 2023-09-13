import React from "react";
import { useLifts } from "../../context/LiftContext/LiftsContext";
import style from './dashboard.module.css'
import Lists from "../Lists/Lists";
import Select from "../ui/Select/Select";
import Modal from "../modals/Modal/Modal";
import Spinner from "../ui/Spinner/Spinner";


const Dashboard = () => {
  const { filteredArr, handleSelectChange, isLoading } = useLifts()

  return (
    <div>
      <Modal />

      <div className={style.Dashboard}>
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
};

export default Dashboard;
