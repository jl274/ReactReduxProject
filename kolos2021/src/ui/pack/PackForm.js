import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { addNewPack, editPack } from "../../ducks/pack/actions";
import { getPackById } from "../../ducks/pack/selectors";

const PackForm = ({addNewPack, history, id, pack, editPack}) => {

    const initialValues = id ? {title: pack.title, name: pack.name, extended: pack.extended} : {
        title: "",
        name: "",
        extended: false
    }

    const submit = (packInfo) => {
        if (id){
            editPack(id, packInfo);
            history.push('/')
        } else {
            const randomId = Math.floor(Math.random()*10000);
            addNewPack(randomId, packInfo);
            history.push('/')
        }
    }

    const names = ["Andrzej Kowalski", "Mateusz Mateuszowski", "Jakub Lendzinski", "Jack Frost", "Mikołaj Święty",
        "Witold Wacław", "Filip Bidet", "Michał Michalski"];

    return (
        <div className="form">
            <h2>{id ? "Edycja" : "Dodanie"}</h2>
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
                    <button type="submit">{id ? "Edytuj" : "Dodaj"}</button>
                </Form>}

            </Formik>
        </div>
    )
}

const mapStateToProps = (state, otherProps) => {
    const { match: {params: {id}} } = otherProps;
    return {
        id,
        pack: getPackById(state, id)
    }
}

const mapDispatchToProps = {
    addNewPack,
    editPack
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PackForm));