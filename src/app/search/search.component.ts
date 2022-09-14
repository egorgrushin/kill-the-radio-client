import { Component } from '@angular/core';
import { BaseComponent } from '../core/base.component';
import { ILoadingState } from 'mts-store';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends BaseComponent {
	loadingState: ILoadingState = {};

	constructor() {
		super();
	}

	ngOnInit(): void {
	}

}
