import {Injectable} from '@angular/core';

@Injectable()
export class AuthFormatter {
	private readonly roleNames = {
	};

	constructor() {
	}

	format(data) {
		return {
			...data,
			user: {
				...data.user,
				fullName: `${data.user.firstName} ${data.user.lastName}`,
				role: {
					id: data.user.roleId,
					name: this.roleNames[data.user.roleId],
				},
			},
		};
	}

}
