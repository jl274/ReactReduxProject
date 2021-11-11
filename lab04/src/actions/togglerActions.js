export const typeShowToggle = 'SHOW';
export const typeHideToggle = 'HIDE';


export const showToggle = id => ({type: typeShowToggle, payload: id});
export const hideToggle = id => ({type: typeHideToggle, payload: id});
