import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { API_URL } from '../core/core.types';
import { AuthFormatter } from './auth.formatter';

@Injectable()
export class AuthService {
	constructor(
		private http: Http,
		private authFormatter: AuthFormatter) {
	}

	login(username: string, password: string): Observable<any> {
		return this.http.post(`${API_URL}/auth/login`, { login: username, password })
			.map(res => res.json())
			.map(res => this.authFormatter.format(res.data));
	}

	me(token: string): Observable<any> {
		const headers = new Headers();
		headers.append('Authorization', `Bearer ${token}`);
		const options = { headers };

		return this.http.get(`${API_URL}/auth/me`, options)
			.map(res => res.json())
			.map(res => this.authFormatter.format(res.data));
	}

	logout() {
		return Observable.of(null);
	}

	signupRequest(phone: string) {
		const data = { login: phone };
		return this.http.post(`${API_URL}/user/create`, data)
			.map(res => res.json());
	}

	signupVerify(phone: string, code: string) {
		const data = { login: phone, password: code };
		return this.http.post(`${API_URL}/user/verify`, data)
			.map(res => res.json())
			.map(res => res.data);
	}
}
