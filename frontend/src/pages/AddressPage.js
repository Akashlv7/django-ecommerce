import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAddresses } from '../actions/addressActions'
import { Container, Button, Row, Col, Table } from 'react-bootstrap'
import ModalContainer from '../components/ModalContainer'
import AddressForm from '../components/AddressForm'
import { addAddress, editAddress } from '../actions/addressActions'

function AddressPage() {

  const dispatch = useDispatch()
  const addressList = useSelector(state => state.addressList)
  const {error, loading, address} = addressList

  const [modalClicked, setModalClicked] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleCloseModal = () => setModalClicked(false);
  const handleOpenModal = () => setModalClicked(true);

  useEffect(() => {

    dispatch(getAddresses())
    

  }, [dispatch])

  const addAddressHandler = (data) => {
    dispatch(addAddress(data))
  }

  const editAddressHandler = (data) => {
    dispatch(editAddress(data))
}

const deleteAddressHandler = () => {
    console.log("Address Deleted")
}

  return (
    <Container xs={12} md={6}>
      <Row md={4} lg={4} xs={4} className="d-flex justify-content-between">

        <Col>
          <h2 className='ms-4'>My Addresses</h2>
        </Col>

        <Col className='ps-5'>
          <Button
            type='button'
            onClick={handleOpenModal}
            variant='primary'
            className='ms-5'
          >
            Add New Address +
          </Button>

          {modalClicked ? 
          <ModalContainer 
            open={modalClicked} 
            handleClose={handleCloseModal}
            title="Add Address"
          >
            
          </ModalContainer>
          : null}
        </Col>

      </Row>

      <hr
        style={{
            color: "grey",
        }}
      />

      <Row md={2}>
        {address.map((each_address, index, row) => (
            <Col 
              key={each_address} 
              className='my-3'
              onSelect={selected === each_address.name}
            >
                <Row>
                    <h2>{address[index].name}</h2>
                    <p>
                        {each_address.houseNumber},
                        {'   '}
                        {each_address.street},
                        {'   '}
                        {each_address.state},
                        {'   '}
                        {each_address.country},
                        {'   '}
                        {each_address.pincode}.
                    </p>
                    <strong>+91 {each_address.phone}</strong>
                </Row>

                <Row className='my-3' md={2} lg={2} s={2}>
                    <Col>
                        <Button
                            type='button'
                            className='btn-block'
                            variant='info'
                            onClick={handleOpenModal}
                        >
                            <strong>Edit Address</strong>
                        </Button>

                        {modalClicked ? 
                        <ModalContainer 
                            open={modalClicked} 
                            handleClose={handleCloseModal}
                            title="Edit Address"
                        >
                            <AddressForm submitHandler={editAddressHandler} selected_address={address[index]} />
                        </ModalContainer>
                        : null}

                    </Col>

                    <Col>
                        <Button
                            type='button'
                            className='btn-block'
                            variant='light'
                            onClick={deleteAddressHandler}
                        >
                            <i className='fas fa-trash' ></i>
                        </Button>
                    </Col>
                </Row>
                
            </Col>
        ))}
      </Row>
      
    </Container>
  )
}

export default AddressPage
