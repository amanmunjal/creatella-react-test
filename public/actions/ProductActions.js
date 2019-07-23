import callApi from '../util/apiCaller'

export const GET_PRODUCTS = 'GET_PRODUCTS'

function getProducts (res) {
  return {
    type: GET_PRODUCTS,
    products: res
  }
}

export function getProductsRequest (params) {
  const { sort, page, limit } = params
  return (dispatch) => {
    return callApi(`products?_sort=${sort || 'id'}&_page=${page || 1}&_limit=${limit || 20}`).then(res => {
      dispatch(getProducts(res))
    })
  }
}
