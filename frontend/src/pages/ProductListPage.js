import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams, useLocation, redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'

function ProductListPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    let keyword = location.search

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete, error: errorDelete, success:successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate, error: errorCreate, success:successCreate, product: createdProduct} = productCreate

    const deleteHandler = (product_id) => {
        if(window.confirm('Are you sure that you want to delete this product?')){
            dispatch(deleteProduct(product_id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    useEffect(() => {
        if (!userInfo.isAdmin){
            navigate('/login')
        }

        if(successCreate){
            dispatch({
                type: PRODUCT_CREATE_RESET
            })
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else {
            dispatch(listProducts(keyword))
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword])

  return (
    <div>
    
        <Row className='align-items-center'>

            <Col>
                <h1>Products</h1>
            </Col>

            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'> Create Product</i>
                </Button>
            </Col>

        </Row>

        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

        {
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
        :
        <div> 
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(products => (
                        <tr key={products._id}>
                            <td>{products._id}</td>
                            <td>{products.name}</td>
                            <td>Rs. {products.price}</td>
                            <td>{products.category}</td>
                            <td>{products.brand}</td>

                            <td>
                                <LinkContainer to={`/admin/product/${products._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                
                                <Button variant='danger' className='btn-sm mx-1' onClick={() => deleteHandler(products._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Paginate pages={pages} page={page} isAdmin={true} />

        </div>
        }
    </div>
  )
}

export default ProductListPage
