import * as fromRouter from '@ngrx/router-store';

import { AUTH_INITIAL_STATE, IAuthState } from '../auth/auth.types';
// import { IApiState } from './api/api.types';

export interface IAppState {
	router?: fromRouter.RouterReducerState;
	// it is optional because of it is generic
	api?: any;
	auth?: IAuthState;
}

export const ROUTER_INITIAL_STATE = null;

export const APP_INITIAL_STATE: IAppState = {
	router: ROUTER_INITIAL_STATE,
	auth: AUTH_INITIAL_STATE,
};

export interface IAction {
	type: string;
	metadata: IActionMetadata;
	data?: any;
	path?: string | string[];
}

export interface IActionMetadata {
	isShared?: boolean;
	noPush?: boolean;
}

export const STATE_REPLACE_ACTION = 'STATE_REPLACE_ACTION';
export const UNDO_ACTION = 'UNDO_ACTION';
