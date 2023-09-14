import React from 'react'
import style from './listItem.module.css'
import { AiFillEdit } from 'react-icons/ai'
import { useLifts } from '../../../../context/lift-context/lift-context'

type ListItemProps = {
  name: string
  id: string
  status: string
  disabled: boolean
}

const ListItem: React.FC<ListItemProps> = ({ name, id, status, disabled }) => {
  const { onItemClicked, onShow } = useLifts()

  const handleClick = (itemId: string) => {
    if (!disabled) {
      onItemClicked(itemId)
      onShow()
    }
  }

  const itemStyle = disabled
    ? `${style.ListItem} ${style.disabled}`
    : style.ListItem

  return (
    <div className={itemStyle}>
      <h3>{name}</h3>
      <p>{status}</p>
      {disabled ? null : (
        <button onClick={() => handleClick(id)}>
          <AiFillEdit />
        </button>
      )}
    </div>
  )
}

export default ListItem
