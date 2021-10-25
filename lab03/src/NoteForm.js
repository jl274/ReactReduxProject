import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import './styles/NoteForm.scss';

const NoteForm = () => {

    return (
        <div className="form">
            <Formik 
                initialValues={{
                    text: "",
                    author: ""
                }}
                onSubmit={(vals, { resetForm })=>{
                    console.log(vals);
                    resetForm();
                }}
            >
                {({errors}) => 
                    <Form>
                        <Field as="textarea" type="text-area" name="text" placeholder="Type your note here..."></Field>
                        <Field type="text" name="author" placeholder="Author"></Field>
                        <button type="submit">Submit</button>
                    </Form>
                }
            </Formik>
        </div>
    )
}

export default connect(null, null)(NoteForm);