import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../store';

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	isLoading: boolean;
	err: any;
	currentUser: any = null;
	menu: any[];

	constructor(private store: Store<IAppState>) {

		this.menu = [
			{ url: 'scenarios', text: 'Сценарии' },
		];

	}

	ngOnInit(): void {}

}
