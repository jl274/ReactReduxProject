import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { addNewPack } from "../../ducks/pack/actions";

const PackForm = ({addNewPack, history}) => {

    const initialValues = {
        title: "",
        name: "",
        extended: false
    }

    const submit = (packInfo) => {
        const randomId = Math.floor(Math.random()*10000);
        addNewPack(randomId, packInfo);
        history.push('/')
    }

    const names = ["Andrzej Kowalski", "Mateusz Mateuszowski", "Jakub Lendzinski", "Jack Frost", "Mikołaj Święty",
        "Witold Wacław", "Filip Bidet", "Michał Michalski"];

    return (
        <div className="form">
            <Formik
                initialValues={initialValues}
                onSubmit={(values)=>{submit(values)}}
            >

                {({values}) => 
                <Form>
                    <label>Tytuł gry:</label>
                    <Field type="text" name="title"></Field>
                    <label>Do: </label>
                    <Field as="select" id="producer" name="name">
                        <option value={null}>---</option>
                        {names.map(name => <option key={name} value={name}>{name}</option>)}
                    </Field>
                    <label>Wersja rozszerzona: </label>
                    <div role="group" aria-labelledby="my-radio-group">
                        <label>
                        <Field type="radio" name="extended" value={true} checked={values.extended === true} />
                        Tak
                        </label>
                        <label>
                        <Field type="radio" name="extended" value={false} checked={values.extended === false}/>
                        Nie
                        </label>
                        
                    </div>
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