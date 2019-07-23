import { combineReducers } from 'redux'
import products from './ProductReducer'

const rootReducer = combineReducers({
  products
})

export default rootReducer
