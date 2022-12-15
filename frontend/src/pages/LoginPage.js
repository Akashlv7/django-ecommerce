import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'


function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const location = useLocation().search;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const redirect = location ? '/' + location.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo, error, loading} = userLogin

    useEffect(() => {
        if (userInfo){
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
    <FormContainer>
        <h1>Sign In</h1>

        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    required
                    type='email'
                    placeholder='Enter Email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >

                </Form.Control>
            </Form.Group>
            
            <Button
                type='submit'
                variant='primary'
                className='my-3'
            >
                Sign In
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New User?
                <Link
                    to={ redirect ? `/register?redirect=${redirect}` : '/register' }
                >
                    <Button type='submit' variant='info' className='btn-light pd-3'>Register</Button>
                </Link>
            </Col>
        </Row>
    </FormContainer>
    )
}

export default LoginPage
