import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';
import { AppModule } from './app/app.module';
import { decorateModuleRef } from './app/environment';

export const main = () => {
	return platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.then(decorateModuleRef)
		.catch(err => console.log(err));
};

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
