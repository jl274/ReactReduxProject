import { connect } from 'react-redux';
import { getAllGames } from '../../ducks/games/selectors';
import _ from 'lodash';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie } from 'victory';
import '../../styles/Stats.scss';
import { getAllProducers } from '../../ducks/producers/selectors';
import { useTranslation } from 'react-i18next';

const Stats = ({games, producers}) => {

    const { t } = useTranslation();

    const gameWithMostOffers = () => {
        const game_copy = [...games.map(game => {return {"name": game.name, "offers": game.offers.length}})];
        return _.chain(game_copy).orderBy(['offers']).reverse().value().slice(0, 4);
        
    }
    
    const gamesAvgComplexity = () => {
        const stats = {"0-20": 0, "20-40": 0, "40-60": 0, "60-80": 0, "80-100": 0};
        games.forEach(game => {
            if (parseInt(game.complexity) <= 20){
                stats["0-20"] += 1
            } else if (parseInt(game.complexity) <= 40){
                stats["20-40"] += 1
            } else if (parseInt(game.complexity) <= 60){
                stats["40-60"] += 1
            } else if (parseInt(game.complexity) <= 80){
                stats["60-80"] += 1
            } else {
                stats["80-100"] += 1
            }
        })
        return Object.entries(stats).map(x => {return {"x": x[0], "y": x[1]} }).filter(x => x.y !== 0);
    }
    
    const countCountries = () => {
        const producers_copy = [...producers.map(producer => {return {name: producer.name, country: producer.country}})]
        return _.chain(Object.entries(_.groupBy(producers_copy, 'country')).map(entry => {return {country: entry[0], count: entry[1].length}}))
            .orderBy(['count']).reverse().value();
    }

    return (
        <div className='stats'>
            <ul>
                <li>
                    <h3>{t('stats.offers')}</h3>
                    {gameWithMostOffers() ? <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        padding={{ top: 20, bottom: 40, left: 50, right: 50 }}
                        height={250}
                        width={500}
                        // style={{margin: '100px'}}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                    >
                        <VictoryAxis
                            tickValues={[1, 2, 3, 4]}
                            tickFormat={x => `${x.length > 16 ? x.slice(0, 16) + "..." : x}`}
                            
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(x) => (`${x}`)}
                        />
                        <VictoryBar
                            style={{ data: { fill: "#7F4677" } }}
                            data={gameWithMostOffers() ? gameWithMostOffers() : {}}
                            x="name"
                            y="offers"
                        />
                    </VictoryChart>
                    : null
                    }
                </li>
                <li>
                    <h3>{t('stats.complexity')}</h3>
                    <VictoryPie
                        colorScale={["#7F1677", "#a6409b", "#cd65c1", "#f68be8", "#ffb2ff" ]}
                        labels={({ datum }) => `"${datum.x}/100" ${datum.y}`}
                        theme={VictoryTheme.material}
                        height={250}
                        width={500}
                        data={gamesAvgComplexity()}
                    />
                </li>
                <li>
                    <h3>{t('stats.countries')}</h3>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={25}
                        // padding={{ top: 20, bottom: 40, left: 50, right: 50 }}
                        height={250}
                        width={500}
                        // style={{margin: '100px'}}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                    >
                        <VictoryAxis
                            tickValues={[1, 2, 3, 4]}
                            tickFormat={x => `${x}`}
                            
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(x) => (`${x}`)}
                        />
                        <VictoryBar
                            style={{ data: { fill: "#7F4677" } }}
                            data={countCountries() ? countCountries() : {}}
                            x="country"
                            y="count"
                        />
                    </VictoryChart>
                </li>
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        games: getAllGames(state),
        producers: getAllProducers(state)
    }
}

export default connect(mapStateToProps, null)(Stats);