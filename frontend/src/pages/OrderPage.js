import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVERED_RESET } from '../constants/orderConstants'
import RazorPayComponent from '../components/RazorPayComponent'


function PlcaeOrderPage() {

    const order_id = useParams().id

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [sdkReady, setSdkReady] = useState(false);

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: loadingDeliver, success: successDeliver} = orderDeliver

    if( !loading && !error ){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }

    const addRazorPayScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {

        if(!userInfo){
            navigate('/login')
        }

        if( !order || successPay || order._id !== Number(order_id) || successDeliver ){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVERED_RESET})

            dispatch(getOrderDetails(order_id))
        }
        // else if (!order.isPaid) {
        //     if (!window.paypal) {
        //         addPayPalScript()
        //     } else {
        //         setSdkReady(true)
        //     }
        // }
    }, [dispatch, navigate, order, order_id, sdkReady, successPay, successDeliver, userInfo])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order_id, paymentResult))
    }

    const deliveredHandler = () => {
        dispatch(deliverOrder(order._id))
    }

  return loading ? (
    <Loader/>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>

        <h1>Order: {order._id}</h1>

        <Row className='my-3'>
            <Col md={8}>
                <ListGroup variant='flush' >

                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Shipping: </strong>
                            {order.shippingAddress.address},
                            {'   '}
                            {order.shippingAddress.city},
                            {'   '}
                            {order.shippingAddress.state},
                            {'   '}
                            {order.shippingAddress.country},
                            {'   '}
                            {order.shippingAddress.zipcode}
                        </p>
                        { order.isDelivered ? (
                            <Message variant="success">Delivered on: {order.deliveredAt}</Message>
                        ) : (
                            <Message variant="warning">Not Delivered</Message>
                        ) }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        { order.isPaid ? (
                            <Message variant="success">Paid on: {order.paidAt.substring(0, 10)}</Message>
                        ) : (
                            <Message variant="warning">Not Paid</Message>
                        ) }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <Message variant='info'>
                                Oops!! No Orders.
                            </Message>
                        ): (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
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
                                <Col>&#x20B9; {order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>&#x20B9; {order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>&#x20B9; {order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>&#x20B9; {order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {!order.isPaid && (
                            <ListGroup.Item>
                                {/* {loadingPay && <Loader/>} */}

                                <RazorPayComponent orderAmount={order.totalPrice} order_id={order._id} />
                        
                        </ListGroup.Item>
                        )}

                    
                    {loadingDeliver && <Loader/>}

                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered ? 
                    (
                        <ListGroup.Item>
                            <Row>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliveredHandler}
                                >
                                    Mark As Delivered
                                </Button>
                            </Row>
                        </ListGroup.Item>
                    ) : null}

                    </ListGroup>    
                </Card>
            </Col>
        </Row>
      
    </div>
  )
}

export default PlcaeOrderPage
