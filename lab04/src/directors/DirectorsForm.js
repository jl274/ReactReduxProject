import { Form, Formik, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import * as Yup from 'yup';
import {v4 as uuidv4} from 'uuid';
import '../styles/DirectorsForm.scss'

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
                .required('Age is required')
    })

    console.log(uuidv4())


    return(
        <div className="form">
            <Formik
                initialValues={initValues}
                onSubmit={(vals)=>console.log(vals)}
                validationSchema={validationSchema}
            >
            {({errors, touched, isValid}) => 
                <Form>

                    <div className="firstName">
                        <label>First Name</label>
                        <Field type="text" name="firstName" 
                        className={`${errors.firstName && touched.firstName ? `invalid` : ``} 
                        ${!errors.firstName && touched.firstName? `valid` : ``}`}></Field>
                    </div>
                    <ErrorMessage name="firstName" component="div" className="errorMessage"/>

                    <div className="lastName">
                        <label>Last name</label>
                        <Field type="text" name="lastName" 
                        className={`${errors.lastName && touched.lastName ? `invalid` : ``} 
                        ${!errors.lastName && touched.lastName? `valid` : ``}`}></Field>
                    </div>
                    <ErrorMessage name="lastName" component="div" className="errorMessage"/>

                    <div className="age">
                        <label>Age</label>
                        <Field type="number" min="10" max="120" 
                        step="1" name="age" className={`${errors.age && touched.age ? `invalid` : ``} 
                        ${!errors.age && touched.age? `valid` : ``}`}></Field>
                    </div>
                    <ErrorMessage name="age" component="div" className="errorMessage"/>

                    <button type="submit" disabled={!isValid}>Submit</button>

                </Form>
            }
            </Formik>
        </div>
    )
}

export default connect(null, null)(DirectorsForm);