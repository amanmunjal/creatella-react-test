import _ from 'underscore'
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions'
import { getProducts } from '../reducers/ProductReducer'

import Ad from '../components/Ad'
import Product from '../components/Product'

class Products extends Component {

  constructor (props) {
    super(props)
    this.state = {
      products: [],
      params: {
        page: 1,
        sort: 'id',
        limit: 30
      },
      loading: false,
      endOfCatalog: false
    }
  }

  componentWillMount () {
    const { params } = this.state
    const { getProductsRequest } = this.props.actions
    this.setState({ loading: true })

    getProductsRequest(params)
  }

  componentDidMount () {
    const comp = this
    const { params } = comp.state
    const { getProductsRequest } = comp.props.actions

    $(window).scroll(function() {
      const { endOfCatalog } = comp.state

      if (!endOfCatalog && $(window).scrollTop() == $(document).height() - $(window).height()) {
        params['page'] = params.page + 1
        comp.setState({ params, loading: true })

        getProductsRequest(params)
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.products) {
      let { products } = this.state
      if (nextProps.products.length === 0 && products.length !== 0) {
        this.setState({ endOfCatalog: true, loading: false })
      }

      this.setState({ products: products.concat(nextProps.products), loading: false })
    }
  }

  sortProductsBy (attrib) {
    const { getProductsRequest } = this.props.actions
    const { params } = this.state

    params['sort'] = attrib
    params['page'] = 1
    this.setState({ params, products: [], loading: true, endOfCatalog: false })

    getProductsRequest(params)
  }

  renderProducts () {
    const { products } = this.state

    if (products.length > 0) {
      return _.map(products, (product, index) => {
        let elements = []
        elements.push(<Product product={product} key={`product-${index}`} />)

        if ((index+1)%20 == 0) {
          elements.push(<Ad key={`ad-${index}`} />)
        }
        return elements
      })
    }
  }

  render () {
    const { loading, endOfCatalog, params } = this.state

    return (
      <div className='container'>
        <div className='sort-options'>
          <div className='dropdown'>
            <a className='btn btn-outline-info dropdown-toggle' href='#' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
              Sort by : <span className='upcase'>{params.sort}</span>
            </a>
            <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
              <a className='dropdown-item' href='javascript:void(0)' onClick={() => this.sortProductsBy('id')}>ID</a>
              <a className='dropdown-item' href='javascript:void(0)' onClick={() => this.sortProductsBy('price')}>Price</a>
              <a className='dropdown-item' href='javascript:void(0)' onClick={() => this.sortProductsBy('size')}>Size</a>
            </div>
          </div>
        </div>
        <div className='row'>
          {this.renderProducts()}
        </div>
        <div className='center'>
          {loading && 'Loading...'}
          {endOfCatalog && '~ end of catalogue ~'}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    products: getProducts(state)
  }
}

function mapDispatchToProps (dispatch) {
  const { getProductsRequest } = actions
  return {
    actions: bindActionCreators(
      {
        getProductsRequest
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
