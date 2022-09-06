import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { IAction, IActionMetadata } from '../store/store.types';

export const NAME = 'Auth';

export const ACTION_TYPES = {
	LOGIN: StoreService.registerType(NAME, 'Login'),
	LOGIN_SUCCESS: StoreService.registerType(NAME, 'Login', 'Success'),
	LOGIN_FAILED: StoreService.registerType(NAME, 'Login', 'Failed'),
	LOGOUT: StoreService.registerType(NAME, 'Logout'),
	ME: StoreService.registerType(NAME, 'Me'),
	UPDATE_USER: StoreService.registerType(NAME, 'Update', 'User'),
	SIGNUP_REQUEST: StoreService.registerType(NAME, 'Signup', 'Request'),
	SIGNUP_REQUEST_SUCCESS: StoreService.registerType(NAME, 'Signup', 'Request', 'Success'),
	SIGNUP_REQUEST_FAILED: StoreService.registerType(NAME, 'Signup', 'Request', 'Failed'),
	SIGNUP_VERIFY: StoreService.registerType(NAME, 'Signup', 'Verify'),
	SIGNUP_VERIFY_FAILED: StoreService.registerType(NAME, 'Signup', 'Verify', 'Failed'),
};

@Injectable()
export class AuthActions {
	constructor() { }

	login(username: string, password: string, metadata: IActionMetadata = {}): IAction {
		const data = {username, password};
		return {type: ACTION_TYPES.LOGIN, data, metadata};
	}

	loginSuccess(token: string, user: any, shouldRedirect = true, metadata: IActionMetadata = {}): IAction {
		const data = {token, user, shouldRedirect};
		return {type: ACTION_TYPES.LOGIN_SUCCESS, data, metadata};
	}

	loginFailed(err: any, metadata: IActionMetadata = {}): IAction {
		const data = err;
		return {type: ACTION_TYPES.LOGIN_FAILED, data, metadata};
	}

	updateUser(user: any, metadata: IActionMetadata = {}): IAction {
		const data = user;
		return {type: ACTION_TYPES.UPDATE_USER, data, metadata};
	}

	logout(metadata?: IActionMetadata): IAction {
		return {type: ACTION_TYPES.LOGOUT, metadata};
	}

	me(token: string, shouldRedirect = true, metadata: IActionMetadata = {}): IAction {
		const data = token;
		return {type: ACTION_TYPES.ME, data, metadata};
	}

	signupRequest(phone: string, metadata: IActionMetadata = {}): IAction {
		const data = {phone};
		return {type: ACTION_TYPES.SIGNUP_REQUEST, data, metadata};
	}

	signupRequestSuccess(metadata?: IActionMetadata): IAction {
		return {type: ACTION_TYPES.SIGNUP_REQUEST_SUCCESS, metadata};
	}

	signupRequestFailed(err: any, metadata: IActionMetadata = {}): IAction {
		const data = err;
		return {type: ACTION_TYPES.SIGNUP_REQUEST_FAILED, data, metadata};
	}

	signupVerify(phone: string, code: string, metadata: IActionMetadata = {}): IAction {
		const data = {phone, code};
		return {type: ACTION_TYPES.SIGNUP_VERIFY, data, metadata};
	}

	signupVerifyFailed(err: any, metadata: IActionMetadata = {}): IAction {
		const data = err;
		return {type: ACTION_TYPES.SIGNUP_VERIFY_FAILED, data, metadata};
	}
}
