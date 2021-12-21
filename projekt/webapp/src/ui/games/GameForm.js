import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../styles/Form.scss';
import { getAllProducers } from '../../ducks/producers/selectors';

const GameForm = ({producers}) => {

    const initialValues = {
        name: "",
        genre: "",
        complexity: 1,
        minAge: 5,
        producer: "",
        playingTime: 15,
        url: "",
        description: ""
    }

    const validationSchema = Yup.object().shape({
        name: Yup
            .string("Title must be a string")
            .min(2, "At least 2 characters")
            .required("Title is required"),
        genre: Yup
            .string("Genre must be a string")
            .min(2, "At least 2 characters")
            .required(),
        complexity: Yup
            .number("Complexity score is a number")
            .integer("Complexity score is an integer")
            .min(1, "Score must be > 0 and < 101")
            .max(100, "Score must be > 0 and < 101")
            .required(),
        minAge: Yup
            .number("Minimum age is a number")
            .integer("Minimum age is an integer")
            .min(5, "Minimum age must be >= 5 and <= 120")
            .max(120, "Minimum age must be >= 5 and <= 120"),
        producer: Yup
            .string()
            .required(),
        playingTime: Yup
            .number("Playing time is a number")
            .integer("Playing time is an integer")
            .min(15, "Playing time must be >= 15 and <= 300")
            .max(300, "Playing time must be >= 15 and <= 300"),
        url: Yup
            .string("Invalid url format")
            .url("Invalid url format"),
        description: Yup
            .string("Description is a string")
    })


    return (
        <div className='form'>
            <h2>Add new game</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({errors, touched, isValid}) => 
                <Form>
                    <div className='leftForm'>
                        <div className="group">
                            <label>Title*</label>
                            <Field type="text" name="name" className={`${errors.name && touched.name ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="name" component="div" className="errorMessage"/>
                        </div>
                        <div className="group">
                            <label>Genre*</label>
                            <Field type="text" name="genre" className={`${errors.genre && touched.genre ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="genre" component="div" className="errorMessage"/>
                        </div>
                        <div className="group">
                            <label>Description</label>
                            <Field as="textarea" type="text" name="description" 
                            className={`${errors.description && touched.description ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="description" component="div" className="errorMessage"/>
                        </div>
                    </div>
                    <div className='rightForm'>
                        <div className="group">
                            <label>Complexity score*</label>
                            <Field type="number" name="complexity" step="1" 
                            className={`${errors.complexity && touched.complexity ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="complexity" component="div" className="errorMessage"/>
                        </div>
                        <div className="group">
                            <label>Minimum recommended age</label>
                            <Field type="number" name="minAge" step="1" 
                            className={`${errors.minAge && touched.minAge ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="minAge" component="div" className="errorMessage"/>
                        </div>
                        <div className="group">
                            <label>Average playing time</label>
                            <Field type="number" name="playingTime" step="1"
                            className={`${errors.playingTime && touched.playingTime ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="playingTime" component="div" className="errorMessage"/>
                        </div>
                        <div className='group'>
                            <label>Producer*</label>
                            <Field as="select" id="producer" name="producer" className={`${errors.producer && touched.producer ? `invalid` : ``}`}>
                                <option value={null}>---</option>
                                {producers ? producers.map(producer => 
                                <option key={producer.name} value={producer.name}>{producer.name}</option>) : null}
                            </Field>
                        </div>
                        <div className="group">
                            <label>Image url</label>
                            <Field type="text" name="url" className={`${errors.url && touched.url ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="url" component="div" className="errorMessage"/>
                        </div>
                    </div>
                    <button type='submit' disabled={!isValid} className={`${isValid ? '' : 'disabled'}`}>Add</button>
                </Form>
                }

            </Formik>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        producers: getAllProducers(state)
    }
}


export default connect(mapStateToProps, null)(GameForm);