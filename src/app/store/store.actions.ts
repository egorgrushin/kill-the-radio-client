import { STATE_REPLACE_ACTION, UNDO_ACTION } from './store.types';

export const undo = (action) => {
	return {type: UNDO_ACTION, data: action};
};

export const replace = (state) => {
	return {type: STATE_REPLACE_ACTION, data: state};
};
