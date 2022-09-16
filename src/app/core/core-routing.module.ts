import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../auth/auth.guard';
import { HomeComponent } from '../home/home.component';
import { SearchComponent } from '../search/search.component';

export const APP_ROUTES: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'search', component: SearchComponent },
];

@NgModule({
	imports: [
		RouterModule.forRoot(APP_ROUTES),
	],
	exports: [RouterModule],
})
export class CoreRoutingModule {}
