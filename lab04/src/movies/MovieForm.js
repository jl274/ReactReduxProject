import { Form, Formik, Field } from "formik";
import { connect } from "react-redux";
import * as Yup from 'yup';

const MovieForm = (props) => {

    const initValues={
        title: "",
        number: 2020
    }

    return(
        <div className="form">
            <Formik
                initialValues={initValues}
                onSubmit={(vals)=>console.log(vals)}
            >
            {({errors, touched}) => 
                <Form>
                    <Field type="text" name="title"></Field>
                    <Field type="number" min="1900" max="2022" step="1" name="productionYear"></Field>
                    {/* Powinno być wybór reżyserów z listy*/}
                </Form>
            }
            </Formik>
        </div>
    )
}

export default connect(null. null)(MovieForm);