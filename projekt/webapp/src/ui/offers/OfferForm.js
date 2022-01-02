import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import '../../styles/Form.scss';
import '../../styles/Tooltip.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { getGamesNameAndId } from '../../ducks/games/selectors';
import { editOfferInDB, sendOfferToDB } from '../../ducks/offers/operations';
import { getGamesFromDB } from '../../ducks/games/operations';
import { getOneOffer } from '../../ducks/offers/selectors';

const returnArrow = <FontAwesomeIcon icon={faArrowLeft} />

const OfferForm = ({history, games, sendOfferToDB, getGamesFromDB, offerToEdit, editOfferInDB}) => {

    const { t } = useTranslation();

    const goBack = () => {
        history.push('/offers');
    }

    const initialValues = offerToEdit ? {
        shop: offerToEdit.shop,
        product: offerToEdit.product,
        price: offerToEdit.price,
        link: offerToEdit.link
    } : {
        shop: "",
        product: "",
        price: 0.00,
        link: ""
    }

    const validationSchema = Yup.object().shape({
        shop: Yup
            .string("Shop name must be string")
            .min(2, `${t('validation.minChars')}`)
            .required(`${t('validation.required')}`),
        product: Yup
            .string()
            .required(`${t('validation.required')}`),
        price: Yup
            .number(`${t('validation.float')}`)
            .min(0.01, `${t('validation.price')}`)
            .required(`${t('validation.required')}`),
        link: Yup
            .string()
            .url(`${t('validation.url')}`)
            .required(`${t('validation.required')}`)
    })

    const submitOffer = async (values) => {
        if (offerToEdit){
            await editOfferInDB(offerToEdit.id ,values);
        } else {
            await sendOfferToDB(values); 
            await getGamesFromDB();
        }
        goBack();
    }

    return (
        <div className="form">
            <h2>
                {offerToEdit ? t('offerForm.h2edit') : t('offerForm.h2')}
                <div className='arrow' aria-label={`${t('offerForm.return')}`} data-tooltip="up" onClick={goBack}>
                    {returnArrow}
                </div>
            </h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values)=>{submitOffer(values)}}
            >
                {({errors, touched, isValid}) => 
                <Form>
                    <div className='leftForm'>
                        <div className="group">
                            <label>{t('offerForm.form.shop')}</label>
                            <Field type="text" name="shop" className={`${errors.shop && touched.shop ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="shop" component="div" className="errorMessage"/>
                        </div>
                        <div className="group"> 
                            <label>{t('offerForm.form.product')}</label>
                            <Field 
                                as="select" id="product" disabled={offerToEdit}
                                name="product" className={`${errors.product && touched.product ? `invalid` : ``}`}
                            >
                                <option value={null}>---</option>
                                {games ? games.map(game => 
                                    <option key={game.id} value={game.id}>{game.name}</option>
                                ) : null}
                            </Field>
                        </div>
                    </div>
                    <div className='rightForm'>
                        <div className="group">
                            <label>{t('offerForm.form.price')}</label>
                            <Field type="number" name="price" step="0.5" 
                            className={`${errors.price && touched.price ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="price" component="div" className="errorMessage"/>
                        </div>
                        <div className="group">
                            <label>{t('offerForm.form.link')}</label>
                            <Field type="text" name="link" className={`${errors.link && touched.link ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="link" component="div" className="errorMessage"/>
                        </div>
                    </div>
                    <button type='submit' disabled={!isValid} className={`${isValid ? '' : 'disabled'}`}
                    >
                        {offerToEdit ? t('offerForm.form.buttonEdit') : t('offerForm.form.button')}
                    </button>
                </Form>
                }
            </Formik>
        </div>
    )
}

const mapStateToProps = (state, otherProps) => {
    const {match: {params: {id}}} = otherProps;
    return {
        offerToEdit: id ? getOneOffer(state, id) : null,
        games: getGamesNameAndId(state)
    }
}

const mapDispatchToProps = {
    sendOfferToDB,
    editOfferInDB,
    getGamesFromDB
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfferForm));