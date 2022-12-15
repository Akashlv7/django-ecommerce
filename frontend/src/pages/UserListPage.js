import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams, useLocation, redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Tab } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'

function UserListPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete, error:errorDelete } = userDelete

    const deleteHandler = (user_id) => {
        if(window.confirm('Are you sure that you want to delete this user?')){
            dispatch(deleteUser(user_id))
        }
    }

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin){
            navigate('/login')
        }
        else {
            dispatch(listUsers())
        }
    }, [dispatch, navigate, userInfo, successDelete])

  return (
    <div>
      <h1>Users</h1>
      {errorDelete && <Message variant='danger'>{errorDelete}</Message> }
      {
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
        : 
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? (
                            <i className='fas fa-check' style={{color: 'green'}}></i>
                        ): (
                            <i className='fas fa-times' style={{color: 'red'}}></i>
                        )}
                        </td>
                        <td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                            </LinkContainer>
                            
                            {userInfo._id !== user._id ? (
                                <Button variant='danger' className='btn-sm mx-1' onClick={() => deleteHandler(user._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            ): null}
                            
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
      }
    </div>
  )
}

export default UserListPage
