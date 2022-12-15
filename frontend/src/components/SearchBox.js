import React, {useState} from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function SearchBox() {

    const navigate = useNavigate();
    const location = useLocation();

    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault()

        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }
        else{
            navigate(location.pathname)
        }

    }


  return (
    <Form onSubmit={submitHandler}>

        <Row className="mb-3">

            <Col md={8}>
                <Form.Control
                    type='text'
                    name='q'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className='mr-sm-2 sm-5'
                >

                </Form.Control>
            </Col>

            <Col md={4}>
                <Button
                    type='submit'
                    variant='primary'
                    className='p-2'
                >
                    Submit
                </Button>
            </Col>
        
        </Row>
      
    </Form>
  )
}

export default SearchBox
