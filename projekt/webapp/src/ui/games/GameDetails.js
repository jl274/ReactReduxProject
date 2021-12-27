import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getOneGameById } from "../../ducks/games/selectors"

const GameDetails = ({game}) => {

    return (
        <div className="details">
            Test
            {console.log(game)}
        </div>
    )
}

const mapStateToProps = (state, otherProps) => {
    const {match: {params: {id}}} = otherProps
    return {
        game: getOneGameById(state, id)
    }
}

export default withRouter(connect(mapStateToProps, null)(GameDetails));