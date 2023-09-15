import React, { useState } from 'react'
import style from './modal.module.css'
import Backdrop from '../../../shared/back-drop/back-drop'
import { Lift, useLifts } from '../../../context/lift-context/lift-context'
import Select from '../../ui/select/Select'
import Lists from '../../dash-board/Lists/Lists'
import Button from '../../ui/button/Button'

type modalDataProps = {
  selectedItem: any 
  selectedItemStatus: any
  setSelectedItemStatus: (status: string) => void
}

const ModalData: React.FC<modalDataProps> = ({ selectedItem, selectedItemStatus, setSelectedItemStatus }) => {
  return (
    <div>
      <h1>{selectedItem?.name}</h1>
      <h1>Elevation Gain : {selectedItem?.elevation_gain}</h1>
      <p style={{ textAlign: 'left', marginBottom: '0', marginTop: '25px' }}>
        Update Status
      </p>
      <Select
        defaultValue={selectedItem?.status}
        handleChange={(e) => setSelectedItemStatus(e.target.value)}
        options={[{ value: 'HOLD' }, { value: 'CLOSED' }, { value: 'OPEN' }]}
      />
    </div>
  )
}

const Modal: React.FC = () => {
  const { filteredArr, selectedItemId, isOpen, onShow, onUpdate, isLoading } =
    useLifts()
  const [selectedItemStatus, setSelectedItemStatus] = useState<string | null>(
    null
  )
  let selectedItem   = filteredArr.find(
      (elem: Lift) => elem._id === selectedItemId
    )

  const modalClasses = [style.Modal, isOpen ? style.open : style.closed]

  return (
    <Backdrop
      show={isOpen}
      clicked={(e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) =>
        onShow(e)
      }
    >
      <div className={modalClasses.join(' ')}>
        <div className={style.modalDiv}>
          {selectedItemId && isOpen ? (
            <ModalData
              selectedItem={selectedItem}
              selectedItemStatus={selectedItemStatus}
              setSelectedItemStatus={setSelectedItemStatus}
            />
          ) : null}

          <Lists lists={filteredArr} disabled={true} height={'30vh'} />
          <div className={style.btnDiv}>
            <Button value='CANCEL' handleClick={onShow} btnType='Danger' />
            <Button
              value={isLoading ? 'UPDATING...' : 'SAVE'}
              handleClick={(e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) =>
                onUpdate(e , selectedItemId || '', selectedItemStatus || '')
              }
              btnType='Success'
            />
          </div>
        </div>
      </div>
    </Backdrop>
  )
}

export default Modal
