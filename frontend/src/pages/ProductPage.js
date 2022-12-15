import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductPage() {
  const product_id = useParams().id;
  const navigate = useNavigate();

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector(state => state.productDetails)
  const {error, loading, product} = productDetails

  const createProductReview = useSelector(state => state.createReview)
  const {error: errorCreateReview, loading: loadingCreateReview, success: successCreateReview ,review} = createProductReview

  useEffect(() => {

    if(successCreateReview){
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})

      setComment('')
      setRating(0)
    }

    dispatch(listProductDetails(product_id))

  }, [dispatch, product_id, successCreateReview])

  const addToCartHandler = () => {
    navigate(`/cart/${product_id}?qty=${qty}`)
  }

  const submitReviewHandler = (e) => {
    e.preventDefault()

    dispatch(createReview(
      {
        "product_id": product_id,
        rating,
        comment
      }
    ))
  }


  return (
    <div>
      <Link to='/' className='btn btn-light my-3'> Go Back </Link>
      {loading ? 
        <Loader />
        : error
          ? <Message variant='danger'>{error}</Message>
            : (
              <div>
                <Row>
            
                  <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                  </Col>

                  <Col md={3}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <h2>{product.name}</h2>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} ratingColor={'#FFFF00'} />
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <h3><strong>Price: &#x20B9; {Math.round(product.price)}</strong></h3>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <h5>Description: {product.description}</h5>
                      </ListGroup.Item>

                    </ListGroup>
                  </Col>

                  <Col md={3}>
                    <Card>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <Row>
                            <Col>Price:</Col>
                            <Col>
                              <strong>&#x20B9; {product.price}</strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Row>
                            <Col>Status:</Col>
                            <Col>
                              {product.countInStock > 0 ? 'Available' : 'Out of Stock'}
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>Qty:</Col>
                              <Col>
                                <Form.Control
                                  as='select'
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {
                                    [...Array(product.countInStock).keys()].map((x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    ))
                                  }

                                </Form.Control>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                          <Row>
                            <Button 
                              className='btn-block' 
                              type='button' 
                              disabled={product.countInStock <= 0}
                              onClick={addToCartHandler}
                              >
                                Add to Cart
                            </Button>
                          </Row>
                        </ListGroup.Item>

                      </ListGroup>
                    </Card>
                  </Col>

                </Row>

                <Row className='my-3'>
                    <Col md={6}>
                      <h4>Reviews</h4>
                      {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                      <ListGroup variant='flush'>
                        {product.reviews.map((review) => (
                          <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} ratingColor='#f8e825' />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                          </ListGroup.Item>
                        ))}

                      </ListGroup>

                    </Col>

                    <Col md={6}>
                        <ListGroup variant='flush'>

                            <ListGroup.Item>
                              <h4>Write a review</h4>


                              {loadingCreateReview && <Loader/>}
                              {errorCreateReview && <Message variant='danger'>{errorCreateReview}</Message>}

                              {userInfo ? (
                                <Form onSubmit={submitReviewHandler}>
                                  <Form.Group controlId='rating'>

                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                      as='select'
                                      value={rating}
                                      onChange={(e) => setRating(e.target.value)}
                                    >
                                      <option value=''>Select Rating</option>
                                      <option value='1'>1 - Poor</option>
                                      <option value='2'>2 - Not Bad</option>
                                      <option value='3'>3 - Good</option>
                                      <option value='4'>4 - Very Good</option>
                                      <option value='5'>5 - Excellent</option>
                                    </Form.Control>

                                  </Form.Group>

                                  <Form.Group controlId='comment'>

                                    <Form.Label>Review</Form.Label>

                                    <Form.Control
                                      as='textarea'
                                      row='5'
                                      value={comment}
                                      onChange={(e) => setComment(e.target.value)}
                                    >

                                    </Form.Control>

                                  </Form.Group>

                                  <Button
                                    disabled={loadingCreateReview}
                                    type='submit'
                                    variant='primary'
                                  >
                                    Submit
                                  </Button>

                                </Form>
                              ): (
                                <Message variant='info'>Please <Link to='/login'>Login</Link> to write a review</Message>
                              )}
                            </ListGroup.Item>

                          </ListGroup>
                    </Col>
                </Row>

              </div>
            )
    }
    </div>
  )
}

export default ProductPage
