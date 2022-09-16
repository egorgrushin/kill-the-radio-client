import { NgModule } from '@angular/core';

import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from "@agm/core";

@NgModule({
	imports: [
		SharedModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyBLI9FEGPlaEePQJwNll-p8_UgkoUhQ_GE',
		}),
		SearchRoutingModule,
	],
	declarations: [SearchComponent],
})
export class SearchModule {
}
