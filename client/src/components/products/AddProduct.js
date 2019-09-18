import React, { Component } from 'react';
import Form from '../form/Form';
import FormReview from '../form/FormReview';
import { reduxForm } from 'redux-form';

class AddProduct extends Component {
    state = { showFormReview: false };

    render() {
        return (
            <div>
                {this.state.showFormReview ? 
                    <FormReview onCancel={ () => {this.setState({showFormReview: false})} }/> : 
                    <Form onProductSubmit={ () => {this.setState({showFormReview: true})} }/>
                }
            </div>
        );
    }
}

export default reduxForm({
    form: 'productForm'
})(AddProduct) ;