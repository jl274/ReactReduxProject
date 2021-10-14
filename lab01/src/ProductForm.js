import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import './styles/ProductForm.scss';
import { withRouter } from "react-router";

const url = "https://fakestoreapi.com/";

const ProductForm = (props) => {

    // editing
    const idFromParam = props.match.params.id ? props.match.params.id : 0;
    if (idFromParam) {
        console.log(props)
    }

    const initialValues = {
        title: "",
        price: 0.00,
        description: "",
        category: "",
        image: ""
    }
    // const initialValues = idFromParam ? {
    //     ...props.appUserList.find(user => user.id === idFromParam)
    // } : {
    //     title: "",
    //     price: 0.00,
    //     description: "",
    //     category: "",
    //     image: ""
    // }

    const update = async (newProduct) => {
        try {
            const result = await axios.post(url + "products", newProduct);
            console.log(result.data)
            result.status === 200 ? props.updateProductList(result.data) : props.updateProductList({});
        } catch (error) {
            console.error(error)
        }
        
    };

    const addingSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        price: Yup.number().moreThan(0, 'Must be greater than 0$').required('Price is required'),
        image: Yup.string('Image must have URL format').url('Image must have URL format')
    })

    return (
        <div className="productForm">
            <Formik
                initialValues={initialValues}
                onSubmit={(val, {resetForm})=>{
                    update(val);
                    resetForm();
                }}
                validationSchema={addingSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        <h2>Add new product</h2>
                        <div>
                            <Field 
                                name="title" type="text" placeholder="Title" 
                                className = {`${touched.title && errors.title ? 'invalid' : ''}`}
                            ></Field>
                            <ErrorMessage name="title" component="div" className="error"/>
                        </div>
                        <div>
                            <label>$</label>
                            <Field name="price" type="number" step="0.01" placeholder="Price"
                            className = {`${touched.price && errors.price ? 'invalid' : ''}`}></Field>
                            <ErrorMessage name="price" component="div" className="error"/>
                        </div>
                        <Field name="description" type="text" placeholder="Description" ></Field>
                        <Field name="category" type="text" placeholder="Category" ></Field>
                        <div>
                            <Field name="image" type="text" placeholder="Image url"
                            className = {`${touched.image && errors.image ? 'invalid' : ''}`}></Field>
                            <ErrorMessage name="image" component="div" className="error"/>
                        </div>
                        
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

export default withRouter(ProductForm);