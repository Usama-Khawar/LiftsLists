import React from 'react'
import style from './back-drop.module.css'

type BackdropProps = {
  show: boolean
  clicked: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
  children: React.ReactNode
}

const Backdrop: React.FC<BackdropProps> = ({ show, clicked, children }) => {
  const backDropClass = [style.Backdrop, show ? style.open : style.close]
  return (
    <>
      <div className={backDropClass.join(' ')} onClick={(e) => clicked(e)}>
        {children}
      </div>
    </>
  )
}

export default Backdrop
