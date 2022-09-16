import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomComponent } from './room.component';

const routes: Routes = [
	{ path: 'room/:id', component: RoomComponent, pathMatch: 'full'  },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RoomRoutingModule {
}
