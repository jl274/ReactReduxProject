import { connect } from "react-redux"

const Dashboard = ({directors}, props) => {

    console.log(directors)

    return (
        <div className="dashboard">
            test2
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        directors: state.directors.list
    }
}

export default connect(mapStateToProps, null)(Dashboard);