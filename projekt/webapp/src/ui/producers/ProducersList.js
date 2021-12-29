import { connect } from "react-redux";
import { getAllProducers } from "../../ducks/producers/selectors";
import '../../styles/ProducersList.scss';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { useState } from 'react';

const plus = <FontAwesomeIcon icon={faPlus} />

const ProducersList = ({producers, history}) => {

    const { t } = useTranslation();

    const goToProducerDetails = (id) => {
        history.push({pathname:`/producers/${id}`, state: "producer"})
    };

    const [sortMethod, setSortMethod] = useState("new");

    const producersToMap = () => {
        let producers_copy = [...producers];
        if (sortMethod === "new"){
            producers_copy = _.reverse(producers_copy)
        } else if (sortMethod === "newCompany"){
            producers_copy = _.sortBy(producers_copy, ['established']);
        } else if (sortMethod === "oldCompany"){
            producers_copy = _.reverse(_.sortBy(producers_copy, ['established']));
        } else if (sortMethod === "az"){
            producers_copy = _.sortBy(producers_copy, ['name']);
        } else if (sortMethod === "za"){
            producers_copy = _.reverse(_.sortBy(producers_copy, ['name']));
        }
        console.log(producers_copy)
        return producers_copy
    }

    return (
        <div className="producersBox">
            <ul>
                <h2>{t('producersList.h2')}</h2>
                <div className='sortOptions'>
                    <p>Sort by:</p>
                    <div>
                        <button className={`${sortMethod === "new" ? "active" : ""} left`} onClick={()=>{setSortMethod("new")}}>Newest</button>
                        <button className={`${sortMethod === "old" ? "active" : ""} right`} onClick={()=>{setSortMethod("old")}}>Oldest</button>
                    </div>
                    <div>
                        <button className={`${sortMethod === "az" ? "active" : ""} left`} onClick={()=>{setSortMethod("az")}}>{"A->Z"}</button>
                        <button className={`${sortMethod === "za" ? "active" : ""} right`} onClick={()=>{setSortMethod("za")}}>{"Z->A"}</button>
                    </div>
                    <div>
                        <button className={`${sortMethod === "oldCompany" ? "active" : ""} left`} onClick={()=>{setSortMethod("oldCompany")}}>Established at the earliest</button>
                        <button className={`${sortMethod === "newCompany" ? "active" : ""} right`} onClick={()=>{setSortMethod("newCompany")}}>Established at the latest</button>
                    </div>
                </div>
                <div>
                    <button><Link to='/producers/new'>{t('producersList.add')}{plus}</Link></button>
                </div>
                {producers ? producersToMap().map(producer => 
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