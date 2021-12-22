import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getPackById } from "../../ducks/pack/selectors";

const PackDetails = ({pack}) => {
    return (
        <div>
            <ul>

                <li>Id: {pack.id}</li>
                <li>Tytuł gry: {pack.title}</li>
                <li>Wersja rozszrzeona: {pack.extended ? "Tak" : "Nie"}</li>
                <li>Adresat: {pack.name}</li>
            </ul>
        </div>
    )
};

const mapStateToProps = (state, otherProps) => {
    const { match: {params: {id}} } = otherProps;
    return {
        pack: getPackById(state, id)
    }
}

export default withRouter(connect(mapStateToProps, null)(PackDetails));