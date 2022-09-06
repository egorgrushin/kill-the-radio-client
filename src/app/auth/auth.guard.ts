import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { IAppState } from '../store/store.types';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private router: Router,
		private store: Store<IAppState>) { }

	canActivate(): Observable<boolean> {
		// TODO move currentUser selection to auth manager
		return this.store.select((state) => state.auth.currentUser)
			.flatMap(user => {
				if (!user) {
					this.router.navigate(['/login']);
					return Observable.of(false);
				}
				return Observable.of(true);
			});
	}
}
