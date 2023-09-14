import React from 'react'
import ListItem from './ListItem/ListItem'
import style from './lists.module.css'

type List = {
  _id: string
  name: string
  status: string
}

type ListsProps = {
  disabled: boolean
  lists: List[]
  height?: string
  width?: string
}

const Lists: React.FC<ListsProps> = ({ disabled, lists, height, width }) => {
  return (
    <div className={style.List} style={{ height: height, width: width }}>
      {lists.map((list) => (
        <ListItem
          disabled={disabled}
          id={list._id}
          key={list._id}
          name={list.name}
          status={list.status}
        />
      ))}
    </div>
  )
}

export default Lists
