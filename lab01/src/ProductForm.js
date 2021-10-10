import React from 'react';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';

const url = "https://fakestoreapi.com/";

const ProductForm = (props) => {

    const initialValues = {
        title: "",
        price: 0.00,
        description: "",
        category: "",
        image: ""
    }

    const update = async (newProduct) => {
        try {
            const result = await axios.post(url + "products", newProduct);
            console.log(result.data)
            result.status === 200 ? props.updateProductList(result.data) : props.updateProductList({});
        } catch (error) {
            console.error(error)
        }
        
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(val)=>{
                    update(val);
                }}
            >
                <Form>
                    <Field name="title" type="text" placeholder="Title" ></Field>
                    <Field name="price" type="number" step="0.01" placeholder="Price"></Field>
                    <Field name="description" type="text" placeholder="Description" ></Field>
                    <Field name="category" type="text" placeholder="Category" ></Field>
                    <Field name="image" type="text" placeholder="Image url"></Field>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
};

export default ProductForm;