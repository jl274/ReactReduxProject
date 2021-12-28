import '../../styles/Overview.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStoreAlt } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const shopIcon = <FontAwesomeIcon icon={faStoreAlt}/>

const OfferOverview = ({data, imgUrl, link, gameTitle}) => {

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
                <li className={`${gameTitle ? 'priceOrTitle' : ''}`}>
                    {
                        gameTitle ? 
                        <>
                            <div className='gameTitle'>{gameTitle}</div>
                            <div>{t('offerOverview.price')}<p>{parseFloat(data.price)}</p>,-PLN</div>
                        </> : 
                        <>
                            {t('offerOverview.price')}<p>{parseFloat(data.price)}</p>,-PLN
                        </>
                    }
                    
                </li>
                <li className='selectButtons'>
                    <a href={data.link} target="_blank" rel="noopener noreferrer" ><button type='submit'>{t('offerOverview.button')}</button></a>
                    {link ? <Link to={`/game/${link}`}><button>Game details</button></Link> : null}
                </li>
            </ul>
        </div>
    )
};

export default OfferOverview;