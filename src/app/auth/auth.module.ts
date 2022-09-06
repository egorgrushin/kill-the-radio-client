import { NgModule } from '@angular/core';
import { AuthFormatter } from './auth.formatter';
import { AuthActions } from './auth.actions';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './auth.guard';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';

@NgModule({
	imports: [
		SharedModule,
		EffectsModule.forFeature([
			AuthEffects,
		]),
	],
	exports: [],
	declarations: [],
	providers: [
		AuthFormatter,
		AuthActions,
		AuthService,
		AuthGuard,
	],
})
export class AuthModule {
}
