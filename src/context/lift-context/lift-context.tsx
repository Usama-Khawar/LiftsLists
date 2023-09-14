import React, { createContext, useContext, useState, useEffect } from 'react'
import { patchLift, getLifts } from '../../services/network-manager'

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
  currArr: Lift[]
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
  currArr: [],
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
      const res = await getLifts(
        'https://nutty-puce-scallop.cyclic.app/lifts/alllift'
      )
      setCurrArr(res)
      setFilteredArr(res)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, currArr])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value)
  }

  const onShow = () => {
    console.log('on show called')
    setIsOpen((prevVal) => !prevVal)
  }

  const onItemClicked = (id: string) => {
    setSelectedItemId(id)
  }

  const onUpdate = async (id: string, updatedStatus: string) => {
    setLoading((prevVal) => !prevVal)
    try {
      let foundIndex = currArr.findIndex((x) => x._id === id)
      let updatedArr = [...currArr]
      updatedArr[foundIndex] = {
        ...updatedArr[foundIndex],
        status: updatedStatus,
      }

      const selectedItem = updatedArr[foundIndex]

      await patchLift(
        `https://nutty-puce-scallop.cyclic.app/lifts/editlift/${selectedItem._id}`,
        selectedItem
      )

      setCurrArr(updatedArr)
      onShow()
    } catch (err) {
      console.log('error thrown not updated', err)
    } finally {
      setLoading((prevVal) => !prevVal)
    }

    // setLoading((prevVal) => !prevVal)
    // let foundIndex = currArr.findIndex((x) => x._id === id)
    // let updatedArr = [...currArr]
    // updatedArr[foundIndex] = {
    //   ...updatedArr[foundIndex],
    //   status: updatedStatus,
    // }

    // const selectedItem : Lift = updatedArr[foundIndex]
    // axios
    //   .patch(
    //     `https://nutty-puce-scallop.cyclic.app/lifts/editlift/${selectedItem._id}`,
    //     selectedItem
    //   )
    //   .then((resp) => {
    //     setCurrArr(updatedArr)
    //     onShow()
    //     setLoading((prevVal) => !prevVal)
    //   })
    //   .catch((err) => {
    //     console.log('error thrown not updated', err)
    //     setLoading((prevVal) => !prevVal)
    //   })

    //     const data = patchReq(
    //       `https://nutty-puce-scallop.cyclic.app/lifts/editlift/${selectedItem._id}`,selectedItem
    //     )
    //     console.log(data);
  }

  const contextVal: LiftsContextObj = {
    onShow,
    isOpen,
    onUpdate,
    isLoading,
    currArr,
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
