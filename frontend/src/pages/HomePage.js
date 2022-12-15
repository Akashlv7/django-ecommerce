import React, {useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import TopProductsCarousel from '../components/TopProductsCarousel'



function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList

  let keyword = location.search

  useEffect(() => {
    dispatch(listProducts(keyword))

  }, [dispatch, keyword])

  return (
    <div>
      {!keyword && <TopProductsCarousel/>}
      <h1> Our Products</h1>
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          :
          <div>

            <Row>
              {products.map(product => (
                  <Col key={product._id} sm={12} md={12} lg={12} xl={4}>
                      <Product product={product} />
                  </Col>
              ))}
            </Row>


            <Paginate
              page={page}
              pages={pages}
              keyword={keyword}
            />

          </div>
    }
    </div>
  )
}

export default HomePage
