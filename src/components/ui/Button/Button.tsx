import React from 'react'
import style from './button.module.css'

type ButtonProps = {
  value: string
  handleClick: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void // should be onClick or handleClick
  btnType?: 'Danger' | 'Success'
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  value,
  handleClick,
  btnType = 'Success',
  disabled,
}) => {
  return (
    <button
      className={[style.Button, style[btnType]].join(' ')}
      onClick={(e)=>handleClick(e)}
      disabled={disabled}
    >
      {value}
    </button>
  )
}

export default Button
