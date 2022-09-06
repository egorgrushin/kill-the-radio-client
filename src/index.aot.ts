import {platformBrowser} from '@angular/platform-browser';
import {decorateModuleRef} from './app/environment';

import {AppModuleNgFactory} from '../compiled/src/app/app.module.ngfactory';

export const main = () => {
	return platformBrowser()
		.bootstrapModuleFactory(AppModuleNgFactory)
		.then(decorateModuleRef)
		.catch(err => console.log(err));
};

export function bootstrapDomReady() {
	document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
