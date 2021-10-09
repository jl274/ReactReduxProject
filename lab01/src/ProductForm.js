import React from 'react';
import { Field, Form, Formik } from 'formik';

const ProductForm = () => {

    const initialValues = {
        title: "",
        price: 0,
        description: "",
        category: "",
        image: ""
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(val)=>console.log(val)}
            >
                <Form>
                    <Field name="title" type="text" ></Field>
                    <Field name="price" type="number" step="0.01"></Field>
                    <Field name="description" type="text" ></Field>
                    <Field name="category" type="text" ></Field>
                    <Field name="image" type="text" ></Field>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
};

export default ProductForm;