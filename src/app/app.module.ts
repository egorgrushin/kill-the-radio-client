import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
	AgmCoreModule
} from '@agm/core';
/* Dev Imports */
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/* Feature Modules */
import { CoreModule } from './core/core.module';
import { DOMOverlayRenderer, ModalModule, Overlay, OverlayRenderer } from 'ngx-modialog';
import { BootstrapModalModule, Modal } from 'ngx-modialog/plugins/bootstrap';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { SearchModule } from './search/search.module';
import { RoomModule } from './room/room.module';
import { AuthModule } from './auth/auth.module';

/* Devtools etc */
import { ENV_PROVIDERS } from './environment';
/* Root routing module */
import { CoreRoutingModule } from './core/core-routing.module';
import '../styles/vendor.scss';
import '../styles/app.scss';
/* App Root */
import { AppComponent } from './app.component';
import { IAppState } from './store/store.types';
import { Store } from '@ngrx/store';
import { replace } from './store/store.actions';

const MODAL_PROVIDERS = [
	Modal,
	Overlay,
	{provide: OverlayRenderer, useClass: DOMOverlayRenderer},
];

@NgModule({
	imports: [
		HomeModule,
		SearchModule,
		RoomModule,
		AuthModule,
		BrowserModule,
		CoreModule,
		SharedModule,
		ModalModule.forRoot(),
		BootstrapModalModule,
		CoreRoutingModule, // should be the last, because the order of routing module matters
	],
	declarations: [
		AppComponent,
	],
	bootstrap: [AppComponent],
	providers: [ENV_PROVIDERS, MODAL_PROVIDERS],
})
export class AppModule {

	constructor(
		public appRef: ApplicationRef,
		private store: Store<IAppState>) {
	}

	hmrOnInit(store) {
		if (!store || !store.state$) return;
		// console.log('HMR store', store);
		// console.log('store.state.data:', store.state.data)

		// inject AppStore here and update it
		store.state$.subscribe(state => {
			this.store.dispatch(replace(state));
			delete store.state$;
			delete store.state$;
		});
		if ('restoreInputValues' in store) {
			setTimeout(store.restoreInputValues);
		}
		// change detection
		this.appRef.tick();
		delete store.restoreInputValues;
	}

	hmrOnDestroy(store) {
		const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
		// recreate elements
		store.disposeOldHosts = createNewHosts(cmpLocation);
		// inject your AppStore and grab state then set it on store
		// var appState = this.AppStore.get()
		// const state = this.store.getState();
		// store.state = { ...state };
		store.state$ = this.store.select(state => state);
		// save input values
		store.restoreInputValues = createInputTransfer();
		// remove styles
		removeNgStyles();
	}

	hmrAfterDestroy(store) {
		// display new elements
		store.disposeOldHosts();
		delete store.disposeOldHosts;
		// anything you need done the component is removed
	}
}
