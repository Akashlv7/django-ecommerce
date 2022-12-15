import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams, useLocation, redirect } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'



function RegisterPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const location = useLocation().search;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const redirect = location ? location.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {userInfo, error, loading} = userRegister

    useEffect(() => {
        if (userInfo){
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            setMessage('')
            dispatch(register(name, email, password))
        }
    }

  return (
    <FormContainer>
        <h1>Register</h1>

        {message && <Message variant='danger'>{message}</Message>}

        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type='name'
                    placeholder='Enter Username'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

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
            

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Button
                type='submit'
                variant='primary'
                className='my-3'
            >
                Register
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Already have an account?
                <Link
                    to={ redirect ? `/login?redirect=${redirect}` : '/login' }
                >
                    <Button type='submit' variant='info' className='btn-light pd-3'>Sign In</Button>
                </Link>
            </Col>
        </Row>

    </FormContainer>
  )
}

export default RegisterPage
