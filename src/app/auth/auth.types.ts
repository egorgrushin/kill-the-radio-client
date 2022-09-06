export interface IAuthState {
	currentUser: any;
	token?: any;
	error?: any;
	isLoading?: boolean;
	signupState?: number;
}

export const AUTH_INITIAL_STATE: IAuthState = {
	currentUser: null,
};
