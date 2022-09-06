import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../auth/auth.guard';
import { ScenariosComponent } from '../scenarios/scenarios/scenarios.component';
import { HomeComponent } from '../home/home.component';

export const APP_ROUTES: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
];

@NgModule({
	imports: [
		RouterModule.forRoot(APP_ROUTES),
	],
	exports: [RouterModule],
})
export class CoreRoutingModule {}
