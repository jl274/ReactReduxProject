import { connect } from "react-redux";
import { getAllProducers } from "../../ducks/producers/selectors";
import '../../styles/ProducersList.scss';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from "react-router-dom";

const ProducersList = ({producers, history}) => {

    const { t } = useTranslation();

    const goToProducerDetails = (id) => {
        history.push({pathname:`/producers/${id}`, state: "producer"})
    }

    return (
        <div className="producersBox">
            <div>
                <Link to='/producers/new'>New</Link>
            </div>
            <ul>
                <h2>{t('producersList.h2')}</h2>
                {producers ? producers.map(producer => 
                    <li 
                        key={producer.id} id={producer.id} 
                        aria-label={`Click for details`} data-tooltip="left"
                        onClick={()=>goToProducerDetails(producer.id)}
                    >
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

export default withRouter(connect(mapStateToProps, null)(ProducersList));