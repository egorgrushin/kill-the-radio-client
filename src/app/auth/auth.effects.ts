import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import { IAction, ROUTER_INITIAL_STATE, STATE_REPLACE_ACTION } from '../store/store.types';

import { ACTION_TYPES, AuthActions } from './auth.actions';
import { AuthService } from './auth.service';
import { AUTH_INITIAL_STATE } from './auth.types';

@Injectable()
export class AuthEffects {
	@Effect() login$ = this.actions$
		.ofType(ACTION_TYPES.LOGIN)
		.switchMap((action: IAction) =>
			this.authService.login(action.data.username, action.data.password)
				.map(data => this.authActions.loginSuccess(data.token, data.user))
				.catch(err => Observable.of(this.authActions.loginFailed(err))),
		);

	@Effect() loginSuccess$ = this.actions$
		.ofType(ACTION_TYPES.LOGIN_SUCCESS)
		.do((action: IAction) => {
			localStorage['token'] = action.data.token;
			if (action.data.shouldRedirect) {
				this.router.navigate(['']);
			}
		})
		.map((action: IAction) => this.authActions.updateUser(action.data.user));

	@Effect() me$ = this.actions$
		.ofType(ACTION_TYPES.ME)
		.switchMap((action: IAction) =>
			this.authService.me(action.data)
				.map(data => this.authActions.updateUser(data.user))
				.catch(() => Observable.of(this.authActions.logout())),
		);

	@Effect() logout$ = this.actions$
		.ofType(ACTION_TYPES.LOGOUT)
		.do((action) => {
			localStorage.removeItem('token');
			this.router.navigate(['']);
		})
		.map(action => this.authActions.updateUser(null))
		.flatMap((action) => Observable.of({
			type: STATE_REPLACE_ACTION,
			data: {
				router: ROUTER_INITIAL_STATE,
				auth: AUTH_INITIAL_STATE,
			},
		}));

	@Effect() signupRequest$ = this.actions$
		.ofType(ACTION_TYPES.SIGNUP_REQUEST)
		.switchMap((action: IAction) =>
			this.authService.signupRequest(action.data.phone)
				.map(() => this.authActions.signupRequestSuccess())
				.catch(err => Observable.of(this.authActions.signupRequestFailed(err))),
		);

	@Effect() verifyRequest$ = this.actions$
		.ofType(ACTION_TYPES.SIGNUP_VERIFY)
		.switchMap((action: IAction) =>
			this.authService.signupVerify(action.data.phone, action.data.code)
				.map(data => this.authActions.loginSuccess(data.token, data.user))
				.catch(err => Observable.of(this.authActions.signupVerifyFailed(err))),
		);

	constructor(
		private authService: AuthService,
		private authActions: AuthActions,
		private router: Router,
		private actions$: Actions) { }
}
