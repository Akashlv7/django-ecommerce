import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'


function TopProductsCarousel() {

  const dispatch = useDispatch();
  
  const productTop = useSelector(state => state.productTop)
  const {error, loading, products} = productTop

  useEffect(() => {

    dispatch(listTopProducts())

  }, [dispatch])

  return ( loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

    <Carousel pause='hover' className='bg-dark'>
      {products.map(product => (
        <Carousel.Item key={product._id}>
          
          <Link
            to={`/product/${product._id}`}
          >
            <Image src={product.image} alt={product.name} fluid/>
            <Carousel.Caption className='carousel.caption'>
              <h4>{product.name} (Rs. {product.price})</h4>
            </Carousel.Caption>

          </Link>

        </Carousel.Item>
      ))}
    </Carousel>
  )
  )
}

export default TopProductsCarousel
