import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

export type Lift = {
  _id: string
  status: string
  name: string
  elevation_gain: string
}

type LiftsContextObj = {
  getLiftsData: () => void
  filterByStatus: (status: string) => Lift[]
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onShow: () => void
  isOpen: boolean
  isLoading: boolean
  onUpdate: (id: string, updatedStatus: string) => void
  filteredArr: Lift[]
  onItemClicked: (id: string) => void
  selectedItemId: string | null
}

type LiftProviderProps = {
  children: React.ReactNode
}

const defaultLiftsContextValue: LiftsContextObj = {
  getLiftsData: () => {},
  filterByStatus: (status: string) => [],
  handleSelectChange: () => {},
  onShow: () => {},
  isOpen: false,
  isLoading: false,
  onUpdate: () => {},
  filteredArr: [],
  onItemClicked: () => {},
  selectedItemId: null,
}

const LiftsContext = createContext<LiftsContextObj>(defaultLiftsContextValue)

export const LiftProvider: React.FC<LiftProviderProps> = ({ children }) => {
  const [currArr, setCurrArr] = useState<Lift[]>([])
  const [status, setStatus] = useState<string>('All')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [filteredArr, setFilteredArr] = useState<Lift[]>([])
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const getLiftsData = async () => {
    try {
      setLoading((prevVal) => !prevVal)
      const res = await axios.get<Lift[]>(
        'https://nutty-puce-scallop.cyclic.app/lifts/alllift'
      )
      setCurrArr(res.data)
      setFilteredArr(res.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading((prevVal) => !prevVal)
    }
  }

  useEffect(() => {
    getLiftsData()
  }, [])

  const filterByStatus = (status: string): Lift[] => {
    const filteredArr = currArr.filter((item) => item.status === status)
    return filteredArr
  }

  useEffect(() => {
    if (status === 'All') {
      setFilteredArr(currArr)
    } else {
      const filteredData = filterByStatus(status)
      setFilteredArr(filteredData)
    }
  }, [status, currArr])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value)
  }

  const onShow = () => {
    setIsOpen((prevVal) => !prevVal)
  }

  const onItemClicked = (id: string) => {
    setSelectedItemId(id)
  }

  const onUpdate = (id: string, updatedStatus: string) => {
    setLoading((prevVal) => !prevVal)
    let foundIndex = currArr.findIndex((x) => x._id === id)
    let updatedArr = [...currArr]
    updatedArr[foundIndex] = {
      ...updatedArr[foundIndex],
      status: updatedStatus,
    }

    const selectedItem : Lift = updatedArr[foundIndex]
    axios
      .patch(
        `https://nutty-puce-scallop.cyclic.app/lifts/editlift/${selectedItem._id}`,
        selectedItem
      )
      .then((resp) => {
        setCurrArr(updatedArr)
        onShow()
        setLoading((prevVal) => !prevVal)
      })
      .catch((err) => {
        console.log('error thrown not updated', err)
        setLoading((prevVal) => !prevVal)
      })
  }

  const contextVal: LiftsContextObj = {
    onShow,
    isOpen,
    onUpdate,
    isLoading,
    filteredArr,
    getLiftsData,
    onItemClicked,
    filterByStatus,
    selectedItemId,
    handleSelectChange,
  }

  return (
    <LiftsContext.Provider value={contextVal}>{children}</LiftsContext.Provider>
  )
}

export const useLifts = () => {
  return useContext(LiftsContext)
}
