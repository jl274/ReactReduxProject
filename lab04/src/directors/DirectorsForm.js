import { Form, Formik, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import * as Yup from 'yup';
import {v4 as uuidv4} from 'uuid';

const DirectorsForm = (props) => {

    const initValues={
        firstName: '',
        lastName: '',
        age: 0
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup
                    .string('Name mus be a string')
                    .required('Name is required')
                    .min(2, 'Name must be at least 2 characters long'),
        lastName: Yup
                    .string('Surname mus be a string')
                    .required('Surname is required')
                    .min(2, 'Surname must be at least 2 characters long'),
        age: Yup
                .number('Age is a number')
                .min(10).max(120)
    })

    console.log(uuidv4())


    return(
        <div className="form">
            <Formik
                initialValues={initValues}
                onSubmit={(vals)=>console.log(uuidv4)}
                validationSchema={validationSchema}
            >
            {({errors, touched}) => 
                <Form>

                    <Field type="text" name="firstName" placeholder="Name"></Field>
                    <ErrorMessage name="firstName" component="div" className="errorMessage"/>

                    <Field type="text" name="lastName" placeholder="Surname"></Field>
                    <ErrorMessage name="lastName" component="div" className="errorMessage"/>

                    <Field type="number" min="10" max="120" step="1" name="age"></Field>
                    <ErrorMessage name="number" component="div" className="errorMessage"/>

                    <button type="submit">Submit</button>

                </Form>
            }
            </Formik>
        </div>
    )
}

export default connect(null, null)(DirectorsForm);