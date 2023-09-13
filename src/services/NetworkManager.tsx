import { Lift } from '../context/LiftContext/LiftsContext'
import axios from 'axios'

export const patchLift = async (url :string, selectedItem :Lift) => {
  try {
    const response = await axios.patch(
      url,
      selectedItem
    )
    return response.data
  } catch (err) {
    console.log('error thrown not updated', err)
    throw err
  }
}