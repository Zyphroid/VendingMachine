import React from 'react';
import { Link } from 'react-router-dom';
import ProductsList from './products/ProductsList';

const Dashboard = () => {
    return (
        <div>
            <span className="row">
                <ProductsList />
            </span>
            <div className='fixed-action-btn'>
                <Link to='/products/new' className='btn-floating btn-large blue'>
                    <i className='material-icons'>add</i>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;