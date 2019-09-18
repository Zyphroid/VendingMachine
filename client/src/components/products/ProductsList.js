import { connect } from 'react-redux';
import React, { Component } from 'react';
import { fetchProducts, buyProduct } from '../../actions';

class ProductsList extends Component {
    constructor() {
        super()
        this.state = { productCode: '' }
    }
    componentDidMount() {
        this.props.fetchProducts();
    }

    renderProducts() {
        return (
            <div>
                <div>
                    <input placeholder="Product code" value={this.state.productCode} onChange={e => this.setState({productCode: e.target.value})}></input>
                    <button onClick={() => this.props.buyProduct(this.state.productCode)} className="btn green">Buy</button>
                </div>

                {this.props.products.map(product => {
                    return (
                        <div className="card grey lighten-4 col s12 m4" key={product._id}>
                            <div className="card-image">
                                <img src={product.image || ''} alt="product img"/>
                            </div>
                            <div className="card-content">
                                <span className="card-title">{product.title}</span>
                                <p>Price: {product.price} </p>
                                <p>Amount: {product.count} </p>
                                <p>Product code: {product.code} </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }

    render() {
        return (<div>{this.renderProducts()}</div>)
    }
}

export default connect(({ products }) => {
    return { products }
}, { fetchProducts, buyProduct })(ProductsList)