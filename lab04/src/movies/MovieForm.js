import { Form, Formik, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import * as Yup from 'yup';
import '../styles/formStyle.scss';
import { addMovie } from "../actions/movieActions";
import {v4 as uuidv4} from 'uuid';

/*<Formik
                initialValues={initValues}
                onSubmit={(vals)=>console.log(vals)}
            >
            {({errors, touched}) => 
                <Form>
                    <Field type="text" name="title"></Field>
                    <Field type="number" min="1900" max="2022" step="1" name="productionYear"></Field>
                    {/* Powinno być wybór reżyserów z listy
*/

const MovieForm = ({ addMovie, directors }, props) => {

    // options to form -----
    const options = directors.map(x => `${x.firstName} ${x.lastName}`);

    // form -----

    const initValues={
        title: "",
        productionYear: 2021,
        director: ""
    }

    const validationSchema = Yup.object().shape({
        title: Yup
            .string("Title must be a string")
            .required("Title is required"),
        productionYear: Yup
            .number("Enter year of production in format YYYY")
            .min(1900)
            .max(new Date().getFullYear())
            .required("Production year is required!"),
        director: Yup
            .string()
            .oneOf([...options])
            .required()
    })

    // form submit -----

    const handleSubmit = (payload) => {
        payload.creationDate = new Date();
        addMovie(uuidv4(), payload);
    }


    return(
        <div className="form">
            <h3>Add movie</h3>
            <Formik
                initialValues={initValues}
                onSubmit={(vals, {resetForm})=>{handleSubmit(vals); resetForm()}}
                validationSchema={validationSchema}
            >
            {({errors, touched, isValid}) => 
                <Form>

                    <div>
                        <label>Title </label>
                        <Field type="text" name="title" 
                        className={`${errors.title && touched.title ? `invalid` : ``} 
                        ${!errors.title && touched.title? `valid` : ``}`}></Field>
                    </div>
                    <ErrorMessage name="title" component="div" className="errorMessage"/>

                    <div>
                        <label>Year </label>
                        <Field type="number" min="1900" max="2022" step="1" name="productionYear" 
                        className={`${errors.productionYear && touched.productionYear ? `invalid` : ``} 
                        ${!errors.productionYear && touched.productionYear? `valid` : ``}`}></Field>
                    </div>
                    <ErrorMessage name="productionYear" component="div" className="errorMessage"/>

                    <div>
                        <label>Director </label>

                        <Field as="select" id="directors" name="director" className={`${errors.director && touched.director ? `invalid` : ``} 
                        ${!errors.director && touched.director? `valid` : ``}`} >
                            <option value={null}></option>
                            {options.map(option_value => <option key={option_value} value={option_value}>{option_value}</option>)}
                        </Field>
                    </div>
                    <ErrorMessage name="director" component="div" className="errorMessage"/>

                    <button type="submit" disabled={!isValid}>Submit</button>

                </Form>
            }
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        directors: state.directors.list
    }
}

const mapDispatchToProps = {
    addMovie
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieForm);