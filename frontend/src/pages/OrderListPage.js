import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getAllOrders } from '../actions/orderActions'

function OrderListPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const orderListAll = useSelector(state => state.orderListAll)
    const {loading, error, orders} = orderListAll

    useEffect(() => {

        if ( userInfo && userInfo.isAdmin){
            dispatch(getAllOrders())
        }else{
            navigate('/login')
        }

    }, [dispatch, navigate, userInfo])

  return (
    <div>
        <h1>Orders</h1>

        {
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
        : 
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>PRICE</th>
                    <th>PAYMENT METHOD</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {orders.map(orders => (
                    <tr key={orders._id}>
                        <td>{orders._id}</td>
                        <td>{orders.user.name}</td>
                        <td>{orders.createdAt.substring(0, 10)}</td>
                        <td>Rs. {orders.totalPrice}</td>
                        <td>{orders.paymentMethod}</td>

                        <td>{ orders.isPaid ? (
                            orders.paidAt.substring(0, 10)
                        ) : (
                            <i className='fas fa-times' style={{color: 'red'}}></i>
                        ) }</td>

                        <td>{ orders.isDelivered ? (
                            orders.deliveredAt.substring(0, 10)
                        ) : (
                            <i className='fas fa-times' style={{color: 'red'}}></i>
                        ) }</td>

                        <td>
                            <LinkContainer to={`/order/${orders._id}/`}>
                                <Button variant='light' className='btn-sm'>
                                    Details
                                </Button>
                            </LinkContainer>
                        </td>

                    </tr>
                ))}
            </tbody>
        </Table>
        }
    </div>
  )
}

export default OrderListPage
