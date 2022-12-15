import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, editUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { USER_EDIT_RESET } from '../constants/userConstants'



function UserEditPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setAdmin] = useState(false);

    const user_id = useParams().id;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails)
    const {user, error, loading} = userDetails

    const userEdit = useSelector(state => state.userEdit)
    const {error: errorEdit, loading: loadingEdit, success: successEdit} = userEdit

    useEffect(() => {

        if(successEdit){
            dispatch({type: USER_EDIT_RESET})
            navigate('/admin/userlist')
        }else{
            if(!user.name || user._id !== Number(user_id)){
                dispatch(getUserDetails(user_id))
            }else {
                setName(user.name)
                setEmail(user.email)
                setAdmin(user.isAdmin)
            }
        }

    }, [dispatch, user, user_id, successEdit, navigate])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(editUser({
            _id: user._id,
            name,
            email,
            isAdmin
        }))

        if(successEdit){
            dispatch({type: USER_EDIT_RESET})
            navigate('/admin/userlist')
        }

    }

  return (
    <div>

        <Link to='/admin/userlist' variant='light'>
            <Button variant='light'>
                Go Back
            </Button>
        </Link>

        <FormContainer>
            <h1>Edit User</h1>
            {loadingEdit && <Loader />}
            {errorEdit && <Message variant='danger'>{errorEdit}</Message>}

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
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
                            type='email'
                            placeholder='Enter Email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isadmin'>
                        <Form.Check
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={(e) => setAdmin(e.target.checked)}
                        >

                        </Form.Check>
                    </Form.Group>

                    <Button
                        type='submit'
                        variant='primary'
                        className='my-3'
                    >
                        Update
                    </Button>
                </Form>
            )}

        </FormContainer>
    </div>
  )
}


export default UserEditPage
