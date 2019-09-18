import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import FormField from './FormField';
import { Link } from 'react-router-dom';
import validateEmail from '../../utils/validateEmail';

export const FIELDS = [
    {label: 'Product Title', name: 'title'},
    {label: 'Price', name: 'price'},
    {label: 'Count', name: 'count'},
    {label: 'Product code', name: 'code'},
    {label: 'Product image url', name: 'image'}
]

class Form extends Component {
    renderFields() {
        return FIELDS.map(({label, name}, index) => {
            return <Field key={index} component={FormField} type="text" name={name} label={label} />
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onProductSubmit)}>
                    {this.renderFields()}
                    <Link to="/products" className="red btn-flat left white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="green btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmail(values.recipients || '');

    FIELDS.forEach(({name}) => {
        if(!values[name]) {
            errors[name] = 'You must provide a value!'
        }
    })

    return errors;
}

export default reduxForm({
    validate,
    form: 'productForm',
    destroyOnUnmount: false
})(Form);