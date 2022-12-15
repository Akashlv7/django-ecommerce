import React, {useState, useEffect} from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Form, Button, ProgressBar } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { addShippingAddress } from '../actions/cartActions'
import CheckoutProgressBar from '../components/CheckoutProgressBar'



function ShippingPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector( state => state.cart )
    const { shippingAddress } = cart

    const [address, setaddress] = useState(shippingAddress.address);
    const [zipcode, setZipcode] = useState(shippingAddress.zipcode);
    const [city, setCity] = useState(shippingAddress.city);
    const [state, setState] = useState(shippingAddress.state);
    const [country, setCountry] = useState(shippingAddress.country);
    const [phone, setPhone] = useState(shippingAddress.phone);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            addShippingAddress({
                address,
                zipcode,
                city,
                state,
                country,
                phone
            })
        )
        navigate('/payment')
    }

    return (
    <FormContainer>
        <ProgressBar now={40} />
        <CheckoutProgressBar step1 step2 />
        <h1>Shipping</h1>

        <Form onSubmit={submitHandler}>

            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter Address'
                    value={ address ? address : '' }
                    onChange={(e) => setaddress(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter City'
                    value={ city ? city : '' }
                    onChange={(e) => setCity(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='state'>
                <Form.Label>State</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter State'
                    value={ state ? state : '' }
                    onChange={(e) => setState(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter Country'
                    value={ country ? country : '' }
                    onChange={(e) => setCountry(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter Phone Number'
                    value={ phone ? phone : '' }
                    onChange={(e) => setPhone(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='zipcode'>
                <Form.Label>Zipcode</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter Zipcode'
                    value={ zipcode ? zipcode : '' }
                    onChange={(e) => setZipcode(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>
                Add Address
            </Button>

        </Form>

    </FormContainer>
    )
}

export default ShippingPage
