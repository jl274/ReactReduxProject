import { TOGGLE_HIDE, TOGGLE_SHOW } from './types';

export const showToggle = id => ({type: TOGGLE_SHOW, payload: id});
export const hideToggle = id => ({type: TOGGLE_HIDE, payload: id});