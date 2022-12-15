import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

function AddressForm({submitHandler, selected_address}) {

    const [name, setName] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [phone, setPhone] = useState('');

    const user = JSON.parse(localStorage.getItem('userInfo'))._id


    const handleSubmitForm = () => {
        submitHandler({
            user,
            name,
            houseNumber,
            street,
            city,
            state,
            country,
            pincode,
            phone
        })
    }

  return (
    <Form onSubmit={handleSubmitForm}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type='name'
                    placeholder='Enter Name'
                    value={selected_address ? selected_address.name : name}
                    onChange={(e) => setName(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='houseNumber'>
                <Form.Label>House Number</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter House Number'
                    value={selected_address ? selected_address.houseNumber : houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='street'>
                <Form.Label>Street</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter Street'
                    value={selected_address ? selected_address.street : street}
                    onChange={(e) => setStreet(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter City'
                    value={selected_address ? selected_address.city : city}
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
                    value={selected_address ? selected_address.state : state}
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
                    value={selected_address ? selected_address.country : country}
                    onChange={(e) => setCountry(e.target.value)}
                >

                </Form.Control>
            </Form.Group>
            
            <Form.Group controlId='pincode'>
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                    required
                    type='number'
                    placeholder='Enter Pincode'
                    value={selected_address ? selected_address.pincode : pincode}
                    onChange={(e) => setPincode(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    required
                    type='number'
                    placeholder='Enter Phone Number'
                    value={selected_address ? selected_address.phone : phone}
                    onChange={(e) => setPhone(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Button
                type='submit'
                variant='primary'
                className='my-3'
            >
                Submit
            </Button>
        </Form>
  )
}

export default AddressForm
