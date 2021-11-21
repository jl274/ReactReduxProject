import { types } from "./counter/types";

export const alertIncrementing = store => next => action => {
    if (action.type === types.INCREMENT) {
        const counterValue = store.getState().counter1.value;
        alert(`Counter is going to increment from ${counterValue} to ${counterValue + 1}`);
    }
    let result = next(action);
    return result;
}

export const autoDecrement = store => next => action => {

    if (action.type === types.DECREMENT) {

        const decrementInterval = setInterval(()=>{

            if (parseInt(store.getState().counter1.value) <= 0) {
                clearInterval(decrementInterval);
            } else {

                next(action);

            }
            
        }, 1000)

        return decrementInterval;
    
        

    } else {
        return next(action)
    }

}