import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import AddProduct from './products/AddProduct';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(actions.fetchUser());
    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/products" component={Dashboard} />
                        <Route path="/products/new" component={AddProduct} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect()(App);


