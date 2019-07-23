import { GET_PRODUCTS } from '../actions/ProductActions'

const initialState = { products: [] }

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_PRODUCTS:
      return Object.assign({}, state, {
        products: action.products,
      })

    default:
      return state

  }
}

export const getProducts = state => state.products.products
export default ProductReducer
