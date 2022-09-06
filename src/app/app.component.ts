import { Component, ViewEncapsulation } from '@angular/core';
import { DialogTypes } from './core/domain/entities/dialog-types';

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
		DialogTypes.addList([
			{ id: 0, text: 'Default' },
			{ id: 1, text: 'FormBuilder' },
			{ id: 2, text: 'PromptAttachment' },
			{ id: 3, text: 'PromptChoice' },
			{ id: 4, text: 'PromptConfirm' },
			{ id: 5, text: 'PromptDouble' },
			{ id: 6, text: 'PromptInt64' },
			{ id: 7, text: 'PromptString' },
			{ id: 8, text: 'Operator' },
			// { id: 9, text: 'InitialState' },
			{ id: 10, text: 'FallThrough' },
		]);
	}
}
