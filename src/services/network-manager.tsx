import { Lift } from '../context/lift-context/lift-context'
import axios from 'axios'

export const patchLift = async (url: string, selectedItem: Lift) => {
  try {
    const response = await axios.patch(url, selectedItem)
    return response.data
  } catch (err) {
    console.log('error thrown not updated', err)
    throw err
  }
}

export const getLifts = async (url: string) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (err) {
    console.log('error thrown not updated', err)
    throw err
  }
}
