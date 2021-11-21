import { connect } from "react-redux";
import { getCounterObject } from "../../ducks/counter/selectors";
import { incrementAction, decrementAction, setIntervalIdAction } from '../../ducks/counter/actions'

const IncrementComponent = ({ counter, incrementAction, decrementAction, setIntervalIdAction }, props) => {

    const handleSubmitIncrement = () => {
        incrementAction();
    };

    let cancelCountdown;

    const handleCountdownStart = () => {
        cancelCountdown = decrementAction();
        setIntervalIdAction(cancelCountdown);
    };

    const handleCountdownStop = () => {
        if (counter.intervalId) {
            clearInterval(counter.intervalId);
            setIntervalIdAction(null);
        }
    };

    return(
        <div>
            <h1>Zad 2</h1>
            <div>
                Counter value: {counter.value} 
                <button onClick={handleSubmitIncrement}>Increment</button>
                <button onClick={handleCountdownStart}>Start countdown</button>
                <button onClick={handleCountdownStop}>Stop</button>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        counter: getCounterObject(state)
    }
};

const mapDispatchToProps = {
    incrementAction,
    decrementAction,
    setIntervalIdAction
};

export default connect(mapStateToProps, mapDispatchToProps)(IncrementComponent);