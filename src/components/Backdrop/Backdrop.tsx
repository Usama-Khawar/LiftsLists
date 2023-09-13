import React from 'react'
import style from './backdrop.module.css'

type BackdropProps = {
  show: boolean
  clicked: () => void
}

const Backdrop: React.FC<BackdropProps> = ({ show, clicked }) => {
  return show ? <div className={style.Backdrop} onClick={clicked}></div> : null
}

export default Backdrop
