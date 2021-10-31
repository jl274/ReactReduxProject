import { connect } from "react-redux"

const Dashboard = ({directors, movies}, props) => {

    console.log("Directors");
    console.log(directors);
    console.log("Movies");
    console.log(movies);

    return (
        <div className="dashboard">
            test2
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        directors: state.directors.list,
        movies: state.movies.list
    }
}

export default connect(mapStateToProps, null)(Dashboard);