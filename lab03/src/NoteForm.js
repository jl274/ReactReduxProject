import { Field, Form, Formik, ErrorMessage } from "formik";
import { connect } from "react-redux";
import './styles/NoteForm.scss';
import { addNote } from './NoteList';
import * as Yup from 'yup';
import { withRouter } from "react-router-dom";

const NoteForm = ({ addNote, history }) => {

    const handleSubmit = (payload) => {
        addNote(payload);
        history.goBack();
    }

    const validationSchema = Yup.object().shape({
        text: Yup.string().min(5, "Your note must be at least 5 characters long").required("Required field"),
        author: Yup.string().required("You must add author")
    })
    

    return (
        <div className="form">
            <Formik 
                initialValues={{
                    text: "",
                    author: ""
                }}
                onSubmit={(vals, { resetForm })=>{
                    handleSubmit(vals);
                }}
                validationSchema={validationSchema}
            >
                {({errors, touched}) => 
                    <Form>
                        <Field as="textarea" type="text-area" 
                        name="text" placeholder="Type your note here..."
                        className={errors.text && touched.text ? `invalid` : ``}
                        ></Field>
                        <ErrorMessage name="text" component="div" className="errorMessage"/>
                        <Field type="text" name="author" placeholder="Author"
                        className={errors.author && touched.author ? `invalid` : ``}></Field>
                        <ErrorMessage name="author" component="div" className="errorMessage"/>
                        <button type="submit">Submit</button>
                    </Form>
                }
            </Formik>
        </div>
    )
}

const mapDispatchToProps = {
    addNote
}

export default withRouter(connect(null, mapDispatchToProps)(NoteForm));