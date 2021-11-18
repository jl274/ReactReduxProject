import { connect } from "react-redux";
import { getCounterObject } from "../../ducks/counter/selectors";
import { incrementAction } from '../../ducks/counter/actions'

const IncrementComponent = ({ counter, incrementAction }, props) => {

    const handleSubmitIncrement = () => {
        incrementAction();
    };

    return(
        <div>
            <h1>Zad 2</h1>
            <div>Counter value: {counter.value} <button onClick={handleSubmitIncrement}>Increment</button></div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        counter: getCounterObject(state)
    }
};

const mapDispatchToProps = {
    incrementAction
};

export default connect(mapStateToProps, mapDispatchToProps)(IncrementComponent);