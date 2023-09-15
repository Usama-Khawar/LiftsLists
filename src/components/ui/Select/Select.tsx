import React, { ChangeEvent } from 'react'

type Option = {
  value: string
}

type SelectProps = {
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void // change the name of it to handleChange/onChange
  options: Option[]
  defaultValue?: string
}

const Select: React.FC<SelectProps> = ({
  handleChange,
  options,
  defaultValue,
}) => {
  return (
    <select onChange={handleChange} defaultValue={defaultValue}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  )
}

export default Select
