import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";

const PackForm = () => {

    const initialValues = {
        title: "",
        name: "",
        surname: ""
    }

    return (
        <div className="form">
            <Formik
                initialValues={initialValues}
            >

                {() => 
                <Form>
                    <label>Game title</label>
                    <Field type="text" name="title"></Field>
                    <label>Name</label>
                    <Field type="text" name="name"></Field>
                    <label>Surname</label>
                    <Field type="text" name="surname"></Field>
                    <button type="submit">Dodaj</button>
                </Form>}

            </Formik>
        </div>
    )
}

export default connect(null, null)(PackForm);