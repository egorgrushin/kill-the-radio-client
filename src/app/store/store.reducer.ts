import * as fromRouter from '@ngrx/router-store';
import { authReducer } from '../auth';
import { API_URL } from '../core/core.types';
import { MtsStore } from 'mts-store';

const reducersMap = {
	router: fromRouter.routerReducer,
	auth: authReducer,
};

export const mtsStore = new MtsStore({
	apiUrl: API_URL,
});

export const reducers = mtsStore
	.fillDomain([
	])
	.fillViews([
	])
	.getDomain(reducersMap);
