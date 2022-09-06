import { NgModule } from '@angular/core';
import { storeFreeze } from 'ngrx-store-freeze';

import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule as RxStoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { APP_INITIAL_STATE, STATE_REPLACE_ACTION } from './store.types';
import { mtsStore, reducers } from './store.reducer';
import { CustomSerializer } from './custom-serializer';
import { EffectsModule } from '@ngrx/effects';
import { MtsStoreConnectingModule, undoReducerFactory } from 'mts-store';
import { IS_DEV } from '../environment';

const stateReplaceReducer = (reducer) => (state, action) => {
	if (action.type === STATE_REPLACE_ACTION) {
		return { ...action.data };
	}
	return reducer(state, action);
};
const devMetaReducers = IS_DEV ? [stateReplaceReducer, storeFreeze] : [];
const metaReducers = [undoReducerFactory(reducers, APP_INITIAL_STATE, 100)].concat(devMetaReducers);

@NgModule({
	imports: [
		RxStoreModule.forRoot(reducers, { metaReducers, initialState: APP_INITIAL_STATE }),
		StoreRouterConnectingModule,
		MtsStoreConnectingModule.forRoot(mtsStore),
		EffectsModule.forRoot([]),
		// TODO add environment conditional
		StoreDevtoolsModule.instrument({
			maxAge: 100,
		}),
	],
	providers: [
		{ provide: RouterStateSerializer, useClass: CustomSerializer },
	],
	declarations: [],
})
export class StoreModule {
	constructor() {}
}
