import React, {useState, useEffect} from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Form, Button, ProgressBar, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { addPaymentMethod } from '../actions/cartActions'
import CheckoutProgressBar from '../components/CheckoutProgressBar'



export default function PaymentPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector( state => state.cart )
    const { shippingAddress } = cart

    const [ paymentMethod, setPaymentMethod ] = useState('RazorPay')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addPaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <ProgressBar now={65} />
        <CheckoutProgressBar step1 step2 step3 />

        <Form onSubmit={submitHandler} className='my-5'>
            <Form.Group>
                <Form.Label as='legend'>Select Payment Method</Form.Label>

                <Col>
                    <Form.Check
                        type='radio'
                        label='Razorpay'
                        id='pay'
                        name='paymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>

                </Col>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>
                Continue
            </Button>
        </Form>
      
    </FormContainer>
  )
}
