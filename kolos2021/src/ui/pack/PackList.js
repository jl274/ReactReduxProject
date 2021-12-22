import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePack } from "../../ducks/pack/actions";
import { getAllPackList } from "../../ducks/pack/selectors";

const PackList = ({packs, deletePack}) => {
    return (
        <div className="packs">
            <div>
                <Link to="/add">Dodaj nową paczkę</Link>
            </div>
            <ul>
                {packs ? packs.map(x => <li key={x.id}><Link to={`/${x.id}`}>Paczka do {x.name}</Link>
                <button onClick={()=>{deletePack(x.id)}}>Usuń</button></li>) : <li>No packs yet</li>}
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        packs: getAllPackList(state)
    }
};

const mapDispatchToProps = {
    deletePack
}

export default connect(mapStateToProps, mapDispatchToProps)(PackList);