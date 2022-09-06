import * as fromRouter from '@ngrx/router-store';
import { authReducer } from '../auth';
import { API_URL } from '../core/core.types';
import { MtsStore } from 'mts-store';
import { Scenarios } from '../core/domain/entities/scenarios';
import { Transitions } from '../core/domain/entities/transitions';
import { States } from '../core/domain/entities/states/states';
import { TransitionExamples } from '../core/domain/entities/transition-examples';
import { ActivityLogs } from '../core/domain/entities/activity-logs/activity-logs';
import { ScenarioView } from '../core/domain/views/scenario-view';
import { SessionsView } from '../core/domain/views/sessions-view';
import { DialogTypes } from '../core/domain/entities/dialog-types';
import { TransitionKeywords } from '../core/domain/entities/transition-keywords';

const reducersMap = {
	router: fromRouter.routerReducer,
	auth: authReducer,
};

export const mtsStore = new MtsStore({
	apiUrl: API_URL,
});

export const reducers = mtsStore
	.fillDomain([
		Scenarios,
		Transitions,
		States,
		TransitionExamples,
		TransitionKeywords,
		DialogTypes,
		ActivityLogs,
	])
	.fillViews([
		ScenarioView,
		SessionsView,
	])
	.getDomain(reducersMap);
