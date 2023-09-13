import React from 'react'
import style from './spinner.module.css'

const Spinner = () => {
  return (
    <div className={style['parent-container']}>
      <div className={style['lds-facebook']}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Spinner
