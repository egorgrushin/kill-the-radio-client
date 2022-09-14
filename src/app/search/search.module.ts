import { NgModule } from '@angular/core';

import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
		SearchRoutingModule,
	],
	declarations: [SearchComponent],
})
export class SearchModule {
}
