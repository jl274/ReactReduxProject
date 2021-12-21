import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../styles/Form.scss';

const GameForm = () => {

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


    return (
        <div className='form'>
            <h2>Add new game</h2>
            <Formik
                initialValues={initialValues}
            >
                {({errors, touched, isValid}) => 
                <Form>
                    <div className='leftForm'>
                        <div className="group">
                            <label>Title</label>
                            <Field type="text" name="name"></Field>
                        </div>
                        <div className="group">
                            <label>Genre</label>
                            <Field type="text" name="genre"></Field>
                        </div>
                        <div className="group">
                            <label>Description</label>
                            <Field as="textarea" type="text" name="description"></Field>
                        </div>
                    </div>
                    <div className='rightForm'>
                        <div className="group">
                            <label>Complexity score</label>
                            <Field type="number" name="complexity" step="1"></Field>
                        </div>
                        <div className="group">
                            <label>Minimum recommended age</label>
                            <Field type="number" name="minAge" step="1"></Field>
                        </div>
                        <div className="group">
                            <label>Average playing time</label>
                            <Field type="number" name="playingTime" step="1"></Field>
                        </div>
                        <div className='group'>
                            <label>Producer</label>
                            <Field as="select" id="producer" name="producer" >
                                <option value={null}>---</option>
                                {/* {options.map(option_value => <option key={option_value} value={option_value}>{option_value}</option>)} */}
                            </Field>
                        </div>
                        <div className="group">
                            <label>Image url</label>
                            <Field type="text" name="url"></Field>
                        </div>
                    </div>
                    <button type='submit'>Add</button>
                </Form>
                }

            </Formik>
        </div>
    )
};

export default connect(null, null)(GameForm);