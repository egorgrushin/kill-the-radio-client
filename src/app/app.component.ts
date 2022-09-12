import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: [
		'./app.component.scss',
	],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
	constructor() {
		const token = localStorage['token'];
		if (token) {
			// TODO make auth manager login
		}
	}

	ngOnInit() {
	}
}
