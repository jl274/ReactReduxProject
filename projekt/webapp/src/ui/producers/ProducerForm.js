import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../../styles/Form.scss';
import '../../styles/Tooltip.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { sendProducerToDB } from "../../ducks/producers/operations";

const returnArrow = <FontAwesomeIcon icon={faArrowLeft} />

const ProducerForm = ({history, sendProducerToDB}) => {

    const { t } = useTranslation();

    const goBack = () => {
        history.push('/producers');
    };

    const initialValues = {
        name: "",
        established: new Date(),
        country: "Poland",
    };

    const today = new Date();

    const validationSchema = Yup.object().shape({
        name: Yup
            .string()
            .min(2, `${t('validation.minChars')}`)
            .required(`${t('validation.required')}`),
        established: Yup
            .date(`${t('validation.date')}`)
            .max(today, `${t('validation.maxDate')}`)
            // .required("Establishing date is required")
            ,
        country: Yup
            .string()
            .required(`${t('validation.required')}`)
    })

    const submitProducer = (values) => {
        sendProducerToDB(values);
        goBack();
    }

    return(
        <div className="form">
            <h2>
                {t('producerForm.h2')}
                <div className='arrow' aria-label={`${t('producerForm.return')}`} data-tooltip="up" onClick={goBack}>
                    {returnArrow}
                </div>
            </h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values)=>{submitProducer(values)}}
            >
                {({errors, touched, isValid}) => 
                <Form>
                    <div className='leftForm'>
                        <div className="group">
                            <label>{t('producerForm.form.name')}</label>
                            <Field type="text" name="name" className={`${errors.name && touched.name ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="name" component="div" className="errorMessage"/>
                        </div>
                        <div className="group">
                            <label>{t('producerForm.form.established')}</label>
                            <Field type="date" name="established" className={`${errors.established ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="established" component="div" className="errorMessage"/>
                        </div>
                        <div className="group">
                            <label>{t('producerForm.form.country')}</label>
                            <Field type="text" name="country" className={`${errors.country && touched.country ? `invalid` : ``}`}></Field>
                            <ErrorMessage name="country" component="div" className="errorMessage"/>
                        </div>
                        <button type='submit' disabled={!isValid} className={`${isValid ? '' : 'disabled'}`}
                        >
                            {t('producerForm.form.button')}
                        </button>
                    </div>
                </Form>
                }
            </Formik>
        </div>
    )
}

const mapDispatchToProps = {
    sendProducerToDB
}

export default withRouter(connect(null, mapDispatchToProps)(ProducerForm));