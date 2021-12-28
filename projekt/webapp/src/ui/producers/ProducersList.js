import { connect } from "react-redux";
import { getAllProducers } from "../../ducks/producers/selectors";
import '../../styles/ProducersList.scss';
import { useTranslation } from 'react-i18next';

// const flagIcon = <FontAwesomeIcon icon={faFlag} />
// const calendarIcon = <FontAwesomeIcon icon={faCalendarAlt} />

const ProducersList = ({producers}) => {

    const { t } = useTranslation();

    return (
        <div className="producersBox">
            <ul>
                <h2>{t('offersList.h2')}</h2>
                {producers ? producers.map(producer => 
                    <li key={producer.id} id={producer.id} aria-label={`Click for details`} data-tooltip="left">
                        <p>{producer.name}</p>
                    </li>
                ) : null}
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        producers: getAllProducers(state)
    }
}

export default connect(mapStateToProps, null)(ProducersList);