import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { StoreModule } from '../store';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { TreeModule } from '../tree/tree.module';
import { ModalService } from './modal.service';

@NgModule({
	imports: [
		SharedModule,
		StoreModule,
		TreeModule,
		CoreRoutingModule,
	],
	declarations: [
		HeaderComponent,
		FooterComponent,
	],
	exports: [
		TreeModule,
		HeaderComponent,
		FooterComponent,
	],
	providers: [ModalService],
})
export class CoreModule {

	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error('CoreModule is already loaded. Import it in the AppModule only');
		}
	}
}
