import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../styles/Form.scss';
import '../../styles/Tooltip.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getAllProducers } from '../../ducks/producers/selectors';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { editGameInDB, sendGameToDB } from '../../ducks/games/operations';
import { getOneGameById } from '../../ducks/games/selectors';

const returnArrow = <FontAwesomeIcon icon={faArrowLeft} />

const GameForm = ({producers, history, sendGameToDB, id, gameToEdit, editGameInDB}) => {

    const { t } = useTranslation();

    const goBack = () => {
        history.location.state ? history.goBack() : history.push('/');
    }

    const postGame = (values) => {
        id ? editGameInDB(id, values) : sendGameToDB(values);
        goBack();
    }

    const getProducerToEditGame = () => {
        return producers.find(x => x.id === gameToEdit.producer).id;
    }

    const initialValues = id ? {
        name: gameToEdit.name,
        genre: gameToEdit.genre,
        complexity: gameToEdit.complexity,
        minAge: gameToEdit.minAge,
        idProducer: getProducerToEditGame(),
        playingTime: gameToEdit.playingTime,
        url: gameToEdit.url,
        description: gameToEdit.description
    } : {
        name: "",
        genre: "",
        complexity: 1,
        minAge: 5,
        idProducer: "",
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
        idProducer: Yup
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
            <h2>
                {id ? t('gameForm.h2edit') : t('gameForm.h2')}
                <div className='arrow' aria-label={`${t('gameForm.return')}`} data-tooltip="up" onClick={goBack}>
                    {returnArrow}
                </div>
            </h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values)=>{postGame(values);}}
            >
                {({errors, touched, isValid}) => 
                <Form>
                    <div className='leftForm'>
                        <div className="group">
                            <label>{t('gameForm.form.title')}</label>
                            <Field type="text" name="name" className={`${errors.name && touched.name ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="name" component="div" className="errorMessage"/>
                        </div>
                        <div className="group">
                            <label>{t('gameForm.form.genre')}</label>
                            <Field type="text" name="genre" className={`${errors.genre && touched.genre ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="genre" component="div" className="errorMessage"/>
                        </div>
                        <div className="group">
                            <label>{t('gameForm.form.description')}</label>
                            <Field as="textarea" type="text" name="description" 
                            className={`${errors.description && touched.description ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="description" component="div" className="errorMessage"/>
                        </div>
                    </div>
                    <div className='rightForm'>
                        <div className="group">
                            <label>{t('gameForm.form.complexity')}</label>
                            <Field type="number" name="complexity" step="1" 
                            className={`${errors.complexity && touched.complexity ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="complexity" component="div" className="errorMessage"/>
                        </div>
                        <div className="group">
                            <label>{t('gameForm.form.minAge')}</label>
                            <Field type="number" name="minAge" step="1" 
                            className={`${errors.minAge && touched.minAge ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="minAge" component="div" className="errorMessage"/>
                        </div>
                        <div className="group">
                            <label>{t('gameForm.form.playingTime')}</label>
                            <Field type="number" name="playingTime" step="1"
                            className={`${errors.playingTime && touched.playingTime ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="playingTime" component="div" className="errorMessage"/>
                        </div>
                        <div className='group'>
                            <label>{t('gameForm.form.producer')}</label>
                            <Field as="select" id="producer" name="idProducer" className={`${errors.idProducer && touched.idProducer ? `invalid` : ``}`}>
                                <option value={null}>---</option>
                                {producers ? producers.map(producer => 
                                <option key={producer.name} value={producer.id}>{producer.name}</option>) : null}
                            </Field>
                        </div>
                        <div className="group">
                            <label>{t('gameForm.form.url')}</label>
                            <Field type="text" name="url" className={`${errors.url && touched.url ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="url" component="div" className="errorMessage"/>
                        </div>
                    </div>
                    <button type='submit' disabled={!isValid} className={`${isValid ? '' : 'disabled'}`}
                    >
                        {id ? t('gameForm.form.buttonEdit') : t('gameForm.form.button')}
                    </button>
                </Form>
                }

            </Formik>
        </div>
    )
};

const mapStateToProps = (state, otherProps) => {

    const { match: { params: { id }}} = otherProps;

    return {
        id,
        gameToEdit: id ? getOneGameById(state, id) : null,
        producers: getAllProducers(state)
    }
}

const mapDispatchToProps = {
    sendGameToDB,
    editGameInDB
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameForm));