import { connect } from "react-redux";
import { getAllProducers } from "../../ducks/producers/selectors";
import '../../styles/ProducersList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';
import { withRouter } from "react-router-dom";

// const flagIcon = <FontAwesomeIcon icon={faFlag} />
// const calendarIcon = <FontAwesomeIcon icon={faCalendarAlt} />
// const returnArrow = <FontAwesomeIcon icon={faArrowLeft} />

const ProducersList = ({producers, history}) => {

    const { t } = useTranslation();

    // const goBack = () => {
    //     history.push('/')
    // }

    return (
        <div className="producersBox">
            <ul>
                {/* <div className='arrow' aria-label={`${t('gameForm.return')}`} data-tooltip="left" onClick={goBack}>
                        {returnArrow}
                </div> */}
                <h2>All available producers</h2>
                {producers ? producers.map(producer => 
                    <li key={producer.id} id={producer.id} aria-label={`Click for details`} data-tooltip="left">
                        <p>{producer.name}</p>
                        {/* <div>
                            {flagIcon}<p>{producer.country}</p>
                        </div>
                        <div>
                            {calendarIcon}<p>{producer.established.slice(0, 10).replaceAll("-", ".")}</p>
                        </div> */}
                    </li>
                ) : null}
            </ul>
        </div>
    )
};

const mapStateToProps = (state, otherProps) => {
    return {
        producers: getAllProducers(state),
        history: otherProps.history
    }
}

export default withRouter(connect(mapStateToProps, null)(ProducersList));