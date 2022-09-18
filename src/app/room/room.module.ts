import { NgModule } from '@angular/core';

import { RoomComponent } from './room.component';
import { RoomRoutingModule } from './room-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from "@agm/core";

@NgModule({
	imports: [
		SharedModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyBLI9FEGPlaEePQJwNll-p8_UgkoUhQ_GE',
		}),
		RoomRoutingModule,
	],
	declarations: [RoomComponent],
})
export class RoomModule {
}
