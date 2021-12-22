import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPackList } from "../../ducks/pack/selectors";

const PackList = ({packs}) => {
    return (
        <div className="packs">
            <div>
                <Link to="/add">Dodaj nową paczkę</Link>
            </div>
            <ul>
                {packs ? packs.map(x => <li key={x.id}><Link to={`/${x.id}`}>Paczka do {x.name} {x.surname}</Link></li>) : <li>No packs yet</li>}
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        packs: getAllPackList(state)
    }
}

export default connect(mapStateToProps, null)(PackList);