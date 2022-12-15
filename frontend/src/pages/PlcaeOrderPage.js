import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form, ProgressBar } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import CheckoutProgressBar from '../components/CheckoutProgressBar'
import FormContainer from '../components/FormContainer'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'


function PlcaeOrderPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const cart = useSelector( state => state.cart )
    const productTax = 18

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    cart.shippingPrice = cart.itemsPrice > 2000 ? 0 : 1
    cart.taxPrice = cart.itemsPrice/100 * productTax
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }

        if(success){
            navigate(`/order/${order._id}`)
        }
        dispatch({
            type: ORDER_CREATE_RESET
        })
    }, [success, navigate, order, dispatch, userInfo])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: Math.round(cart.totalPrice),
        }))
    }



  return (
    <div>
        <FormContainer>
            <ProgressBar now={100} />
            <CheckoutProgressBar step1 step2 step3 step4 />
        </FormContainer>

        <Row className='my-3'>
            <Col md={8}>
                <ListGroup variant='flush' >

                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Shipping: </strong>
                            {cart.shippingAddress.address},
                            {'   '}
                            {cart.shippingAddress.city},
                            {'   '}
                            {cart.shippingAddress.state},
                            {'   '}
                            {cart.shippingAddress.country},
                            {'   '}
                            {cart.shippingAddress.zipcode}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <Message variant='info'>
                                Your cart is empty
                            </Message>
                        ): (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} X &#x20B9;{item.price} = &#x20B9;{(item.qty * item.price)}
                                            </Col>

                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )
                        }
                    </ListGroup.Item>

                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Item:</Col>
                                <Col>&#x20B9; {cart.itemsPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>&#x20B9; {cart.shippingPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>&#x20B9; {cart.taxPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>&#x20B9; {cart.totalPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant='danger' >{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Button 
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </Row>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
      
    </div>
  )
}

export default PlcaeOrderPage
