import { IAction } from '../store';
import { ACTION_TYPES } from './auth.actions';
import { IAuthState, AUTH_INITIAL_STATE } from './auth.types';

export const authReducer = (state: IAuthState = AUTH_INITIAL_STATE, action: IAction): IAuthState => {
	switch (action.type) {
		case ACTION_TYPES.LOGIN: {
			return {
				...state,
				isLoading: true,
			};
		}
		case ACTION_TYPES.LOGIN_SUCCESS: {
			return {
				...state,
				signupState: null,
				isLoading: false,
				error: null,
				token: action.data.token,
			};
		}
		case ACTION_TYPES.LOGIN_FAILED: {
			return {
				...state,
				isLoading: false,
				error: action.data,
			};
		}
		case ACTION_TYPES.UPDATE_USER: {
			return {
				...state,
				currentUser: action.data,
				isLoading: false,
				error: null,
			};
		}
		case ACTION_TYPES.SIGNUP_REQUEST: {
			return {
				...state,
				signupState: 0,
				isLoading: true,
			};
		}
		case ACTION_TYPES.SIGNUP_REQUEST_SUCCESS: {
			return {
				...state,
				signupState: 1,
				isLoading: false,
			};
		}
		case ACTION_TYPES.SIGNUP_REQUEST_FAILED: {
			return {
				...state,
				signupState: 0,
				error: action.data,
				isLoading: false,
			};
		}
		case ACTION_TYPES.SIGNUP_VERIFY: {
			return {
				...state,
				signupState: 1,
				isLoading: true,
			};
		}
		case ACTION_TYPES.SIGNUP_VERIFY_FAILED: {
			return {
				...state,
				signupState: 1,
				error: action.data,
				isLoading: false,
			};
		}
		default:
			return state;
	}
};

export const AUTH_SELECTORS = {
	currentUser: (state: IAuthState) => state.currentUser,
	isLoading: (state: IAuthState) => state.isLoading,
	error: (state: IAuthState) => state.error,
	signupState: (state: IAuthState) => state.signupState,
};
