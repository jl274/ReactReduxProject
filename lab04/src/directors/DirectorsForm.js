import { Form, Formik, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import * as Yup from 'yup';
import {v4 as uuidv4} from 'uuid';
import '../styles/formStyle.scss';
import { addDirector, editDirector } from "../actions/directorsActions";
import { withRouter } from "react-router-dom";

const DirectorsForm = ({addDirector, editDirector, editedDirector, history}, props) => {

    const initValues= editedDirector ? {
        ...editedDirector
    } : {
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

    const handleSubmit = (payload) => {
        if (!payload.country){
            payload.country = "Unknown";
        }
        
        if (editedDirector) {
            editDirector(editedDirector.id, payload);
            history.push(`/directors/${editedDirector.id}`)
        } else {
            addDirector(uuidv4(), payload);
            history.push(`/directors`)
        }
        
    }


    return(
        <div className="form">
            <h3>{editedDirector ? `Add director` : `Edit`}</h3>
            <Formik
                initialValues={initValues}
                onSubmit={(vals, {resetForm})=>{handleSubmit(vals); resetForm()}}
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

const mapStateToProps = (state, otherProps) => {
    if (otherProps.match.params.id){
        const { match: {params: {id}} } = otherProps;
        return {
            editedDirector: state.directors.list.find(x => x.id === id)
        }
    }
    else {
        return{}
    }

}

const mapDispatchToProps = {
    addDirector,
    editDirector
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DirectorsForm));