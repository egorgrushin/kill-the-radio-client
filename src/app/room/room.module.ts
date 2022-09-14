import { NgModule } from '@angular/core';

import { RoomComponent } from './room.component';
import { RoomRoutingModule } from './room-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
		RoomRoutingModule,
	],
	declarations: [RoomComponent],
})
export class RoomModule {
}
