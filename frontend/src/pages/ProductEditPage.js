import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, editProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { PRODUCT_EDIT_RESET } from '../constants/productConstants'



function ProductEditPage() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [brand, setbrand] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);


    const product_id = useParams().id;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productDetails = useSelector(state => state.productDetails)
    const {product, error, loading} = productDetails

    const productEdit = useSelector(state => state.productEdit)
    const {error: errorEdit, loading: loadingEdit, success: successEdit} = productEdit

    useEffect(() => {

        if(successEdit){
            dispatch({type: PRODUCT_EDIT_RESET})
            navigate('/admin/productlist')
        }else{
            if(!product.name || product._id !== Number(product_id)){
                dispatch(listProductDetails(product_id))
            }else {
                setName(product.name)
                setbrand(product.brand)
                setPrice(product.price)
                setImage(product.image)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }

    }, [dispatch, product, product_id, successEdit, navigate])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(editProduct(product_id, {
            _id: product._id,
            name,
            price,
            brand,
            category,
            countInStock,
            description
        }))

        if(successEdit){
            dispatch({type: PRODUCT_EDIT_RESET})
            navigate('/admin/productlist')
        }

    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', product_id)

        setUploading(true)

        try{

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const {data} = await axios.post(
                '/api/products/upload/',
                formData,
                config
            )
            
            setImage(data)
            setUploading(false)

        }catch(error){
            setUploading(false)
        }

    }

  return (
    <div>

        <Link to='/admin/productlist' variant='light'>
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

                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter Product Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Product Brand'
                            value={brand}
                            onChange={(e) => setbrand(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                            type='file'
                            placeholder='Upload Image'
                            onChange={(e) => uploadFileHandler(e)}
                        >

                        </Form.Control>

                        {uploading && <Loader/>}

                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Product category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter number of products'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Product description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >

                        </Form.Control>
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


export default ProductEditPage
