export const togglingReducer = (state = {}, action) => {

    switch (action.type) {
        case 'SHOW':
          return {...state, [action.payload]: true};
        case 'HIDE':
          console.log(action.payload)
          return {...state, [action.payload]: false};
        default:
          return state;
      }
}
