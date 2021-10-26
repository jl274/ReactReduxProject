import { Field, Form, Formik, ErrorMessage } from "formik";
import { connect } from "react-redux";
import './styles/NoteForm.scss';
import { addNote, editNote } from './NoteList';
import * as Yup from 'yup';
import { withRouter } from "react-router-dom";

const NoteForm = ({ addNote, history, editing, editedNote, editNote }) => {

    const handleSubmit = (payload) => {
        editing ? editNote(editedNote.id, payload.text, payload.author) : addNote(payload);
        history.goBack();
    }

    const validationSchema = Yup.object().shape({
        text: Yup.string().min(5, "Your note must be at least 5 characters long").required("Required field"),
        author: Yup.string().required("You must add author")
    })

    const initialValues = editing ? {
        text: editedNote.text,
        author: editedNote.author
    } : {
        text: "",
        author: ""
    }
    

    return (
        <div className="form">
            <Formik 
                initialValues={initialValues}
                onSubmit={(vals)=>{
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

const mapStateToProps = (state, ownProps) => {
    if (ownProps.match.params.id){
        const { match: {params: {id}} } = ownProps;
        return {
            editedNote: state.notes.notes.find(x => x.id.toString() === id.toString())
        }
    }
    else {
        return{}
    }
}

const mapDispatchToProps = {
    addNote,
    editNote
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteForm));