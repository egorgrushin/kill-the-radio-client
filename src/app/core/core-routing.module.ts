import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../auth/auth.guard';
import { HomeComponent } from '../home/home.component';
import { SearchComponent } from '../search/search.component';
import { RoomComponent } from "../room/room.component";

export const APP_ROUTES: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'search', component: SearchComponent },
	{ path: 'room', component: RoomComponent },
];

@NgModule({
	imports: [
		RouterModule.forRoot(APP_ROUTES),
	],
	exports: [RouterModule],
})
export class CoreRoutingModule {}
