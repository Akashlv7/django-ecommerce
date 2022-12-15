import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Rating from './Rating'

function Product({ product }) {
  return (
    <div>
      <Card className='my-3 rounded'>

        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} />
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as='div'>
                <div className='my-3'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} ratingColor={'#FFFF00'} />
                </div>
            </Card.Text>

            <Card.Text as='h3'>
                &#x20B9; {Math.round(product.price)}
            </Card.Text>
        </Card.Body>

      </Card>
    </div>
  )
}

export default Product
