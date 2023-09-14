import React from 'react'
import style from './back-drop.module.css'

type BackdropProps = {
  show: boolean
  clicked: () => void
  children: React.ReactNode
}

const Backdrop: React.FC<BackdropProps> = ({ show, clicked, children }) => {
  return (
    <>
      {show ? <div className={style.Backdrop} onClick={clicked}></div> : null}
      {children}
    </>
  )
}

export default Backdrop
