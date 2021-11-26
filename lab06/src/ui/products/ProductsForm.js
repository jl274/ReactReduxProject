import { Form, Formik, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Yup from 'yup';
import { postNewProductOperation } from "../../ducks/products/operations";
import '../../styles/Form.scss';

const ProductsForm = ({ history, postNewProductOperation }) => {

    const initialValues = {
        title: "",
        price: 0.00,
        category: "",
        description: "",
        image: ""
    }

    const validationSchema =  Yup.object().shape({
        title: Yup
            .string("Title must be a string")
            .required("Title is required")
            .min(2, "Minmum 2 characters"),
        price: Yup
            .number("Price must be a number")
            .required("Price is required")
            .positive("Prcie must be greater than $0"),
        category: Yup
            .string("Category must be a string"),
        description: Yup
            .string("Description must be a string"),
        image: Yup
            .string("Invalid url format")
            .url("Invalid url format")
    })

    const handleSubmit = (values) => {
        console.log(values)
        postNewProductOperation(values)
    }

    return (

        <div className="form">
            <Formik
                initialValues={initialValues}
                onSubmit={(values, {resetForm})=>{handleSubmit(values); resetForm(); history.push("/products")}}
                validationSchema={validationSchema}
            >
            {({errors, touched, isValid}) => <Form><div>

                <div className="group">
                    <label>title</label>
                    <Field type="text" name="title"></Field>
                </div>

                <div className="group">
                    <label>price</label>
                    <Field type="number" min="0" step="5" name="price"></Field>
                </div>

                <div className="group">
                    <label>category</label>
                    <Field type="text" name="category"></Field>
                </div>

                <div className="group">
                    <label>description</label>
                    <Field as="textarea" type="text" name="description"></Field>
                </div>

                <div className="group">
                    <label>image</label>
                    <Field type="url" name="image"></Field>
                </div>

                <button type={"submit"} disabled={!isValid} className={isValid ? '' : 'invalid'}>Submit</button>
            </div></Form>}
            </Formik>
        </div>
    )
}

const mapDispatchToProps = {
    postNewProductOperation
}

export default withRouter(connect(null, mapDispatchToProps)(ProductsForm));