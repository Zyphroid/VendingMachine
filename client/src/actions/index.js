import axios from 'axios';
import {
    FETCH_USER, FETCH_PRODUCTS
} from './types';

export const fetchUser = () => dispatch => {
    axios.get('/api/currentUser')
        .then(res => {
            dispatch({
                type: FETCH_USER,
                payload: res.data
            });
        })
}

export const handleToken = (token, amount) => dispatch => {
    axios.post('/api/stripe', {token, amount})
        .then(res => {
            dispatch({
                type: FETCH_USER,
                payload: res.data
            });
        })
}

export const createProduct = (values, history) => async dispatch => {
    const res = await axios.post('/api/products', values);
    history.push('/products');
    dispatch({type:FETCH_USER, payload: res.data});
}

export const fetchProducts = () => async dispatch => {
    const res = await axios.get('/api/products');
    dispatch({type: FETCH_PRODUCTS, payload: res.data});
}

export const buyProduct = (id) => async dispatch => {
    const res = await axios.put('/api/products', {id})
    console.log('buy res', res);
    if (res.data.message) {
        alert(res.data.message)
        return
    }
    dispatch({type: FETCH_PRODUCTS, payload: res.data.products});
    dispatch({type:FETCH_USER, payload: res.data.user});
}
