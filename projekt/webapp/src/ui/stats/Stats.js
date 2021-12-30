import { connect } from 'react-redux';
import { getAllGames } from '../../ducks/games/selectors';
import _ from 'lodash';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import '../../styles/Stats.scss';

const Stats = ({games}) => {

    const gameWithMostOffers = () => {
        const game_copy = [...games.map(game => {return {"name": game.name, "offers": game.offers.length}})];
        return _.chain(game_copy).orderBy(['offers']).reverse().value().slice(0, 4);
        
    }
    // console.log(gameWithMostOffers())
    return (
        <div className='stats'>
            <ul>
                <li>
                    <h3>Most offers on game</h3>
                    <VictoryChart
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
                            tickFormat={x => `${x}`}
                            
                        />
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(x) => (`${x}`)}
                        />
                        <VictoryBar
                            style={{ data: { fill: "#7F4677" } }}
                            data={gameWithMostOffers()}
                            x="name"
                            y="offers"
                        />
                    </VictoryChart>
                </li>
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        games: getAllGames(state)
    }
}

export default connect(mapStateToProps, null)(Stats);