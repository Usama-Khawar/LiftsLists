import React from 'react'
import style from './button.module.css'

type ButtonProps = {
  value: string
  handleClick: () => void // should be onClick or handleClick
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
      onClick={handleClick}
      disabled={disabled}
    >
      {value}
    </button>
  )
}

export default Button
