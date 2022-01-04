import { connect } from "react-redux";
import { getAllProducers } from "../../ducks/producers/selectors";
import '../../styles/ProducersList.scss';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';

const plus = <FontAwesomeIcon icon={faPlus} />;
const searchIcon = <FontAwesomeIcon icon={faSearch} />;

const ProducersList = ({producers, history}) => {

    const { t } = useTranslation();

    const goToProducerDetails = (id) => {
        history.push({pathname:`/producers/${id}`, state: "producer"})
    };

    const [sortMethod, setSortMethod] = useState("new");
    const [filterOptions, setFilterOptions] = useState({country: "All", after: "All"});

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

        if (filterOptions.country !== "All"){
            producers_copy = producers_copy.filter(x => x.country === filterOptions.country)
        }
        if (filterOptions.after !== "All"){
            producers_copy = producers_copy.filter(x => (new Date(x.established)).getTime() > (new Date(filterOptions.after)).getTime())
        }
        return producers_copy
    }

    return (
        <>
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

                <div className='filterOptions'>
                <p>{t('gameList.filters.title')}</p>
                <Formik
                    initialValues={{country: "All", after: "All"}}
                    onSubmit={values=>setFilterOptions({
                        ...filterOptions, 
                        country: values.country,
                        after: values.after ? values.after : "All"
                    })}
                >
                    {() => 
                        <Form id='filtersProducers'>
                            <div className='producersBox'>
                                <label>Country</label>
                                <Field as="select" name="country">
                                    <option value="All">All</option>
                                    {producers ? _.uniqBy(producers, 'country').map(producer => 
                                        <option key={producer.country} value={producer.country}>{producer.country}</option>) : null
                                    }
                                </Field>
                            </div>
                            <div className="producersBox">
                                <label>Established after</label>
                                <Field name="after" type="date"></Field>
                            </div>
                        </Form>
                    }
                </Formik>
                <div className='submit'>
                    <button type="submit" form='filtersProducers'>{t('gameList.filters.use')} {searchIcon}</button>
                    <button type="reset" form='filtersProducers' onClick={()=>{setFilterOptions({country: "All", after: "All"})}}>Reset</button>
                </div>
            </div>

                <div className="add">
                    <button><Link to='/producers/new'>{t('producersList.add')}{plus}</Link></button>
                </div>

            </ul>
        </div>
        <div className="list">
        {producers && producersToMap().length !== 0 ? producersToMap().map(producer => 
                    <li 
                        key={producer.id} id={producer.id} 
                        aria-label={`Click for details`} data-tooltip="left"
                        onClick={()=>goToProducerDetails(producer.id)}
                    >
                        <p>{producer.name}</p>
                    </li>
                ) : <p style={{"paddingBottom": "20px"}}>Producers not found</p>}
        </div>
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        producers: getAllProducers(state)
    }
}

export default withRouter(connect(mapStateToProps, null)(ProducersList));