import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { addNewPack } from "../../ducks/pack/actions";

const PackForm = ({addNewPack, history}) => {

    const initialValues = {
        title: "",
        name: "",
        surname: ""
    }

    const submit = (packInfo) => {
        const randomId = Math.floor(Math.random()*10000);
        addNewPack(randomId, packInfo);
        history.push('/')
    }

    return (
        <div className="form">
            <Formik
                initialValues={initialValues}
                onSubmit={(values)=>{submit(values)}}
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

const mapDispatchToProps = {
    addNewPack
}

export default withRouter(connect(null, mapDispatchToProps)(PackForm));