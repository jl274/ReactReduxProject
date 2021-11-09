import { Form, Formik, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import * as Yup from 'yup';
import '../styles/formStyle.scss';
import { addMovie } from "../actions/movieActions";
import {v4 as uuidv4} from 'uuid';

const ActorForm = (props) => {

    //form ---
    const initValues= {
        firstName: '',
        lastName: '',
        age: 0,
        country: ''
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
                .required('Age is required'),
        country: Yup
                .string('Country must be a string')
                .min(3, 'At lest 3 characters')
    })

    return (
        <div className={"form"}>
            <h3>Add Actor</h3>
            <Formik
                initialValues={initValues}
                onSubmit={(vals, {resetForm})=>{console.log(vals); resetForm()}}
                validationSchema={validationSchema}
            >
            {({errors, touched, isValid}) => 
                <Form>

                    <div>
                        <label>Name </label>
                        <Field type="text" name="firstName" 
                        className={`${errors.firstName && touched.firstName ? `invalid` : ``} 
                        ${!errors.firstName && touched.firstName? `valid` : ``}`}></Field>
                    </div>
                    <ErrorMessage name="firstName" component="div" className="errorMessage"/>

                    <div>
                        <label>Surname </label>
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

                    <div className="country">
                        <label>Country</label>
                        <Field name="country" type="text" className={`${errors.country && touched.country ? `invalid` : ``} 
                        ${!errors.country && touched.country? `valid` : ``}`}  ></Field>
                    </div>
                    <ErrorMessage name="country" component="div" className="errorMessage"/>

                    <button type="submit" disabled={!isValid}>Submit</button>

                </Form>
            }
            </Formik>
        </div>
    )
}

export default connect(null, null)(ActorForm);