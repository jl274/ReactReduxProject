import '../../styles/Overview.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStoreAlt } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const shopIcon = <FontAwesomeIcon icon={faStoreAlt}/>

const OfferOverview = ({data, imgUrl}) => {

    const { t } = useTranslation();
    
    return (
        <div className="overview">
            <ul>
                <li className='shop'>
                    <p>{shopIcon}</p> {data.shop}
                </li>
                <li className='img'>
                    <img src={imgUrl} alt="Miniature cover"></img>
                </li>
                <li>
                    {t('offerOverview.price')}<p>{parseFloat(data.price)}</p>,-PLN
                </li>
                <li>
                    <a href={data.link} target="_blank" rel="noopener noreferrer" ><button type='submit'>{t('offerOverview.button')}</button></a>
                </li>
            </ul>
        </div>
    )
};

export default OfferOverview;