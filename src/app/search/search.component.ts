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
	map: any;
	loadingState: ILoadingState = {};

	constructor() {
		super();
		this.getPosition((latlng) => {
			this.map = {
				lat: latlng.lat,
				lng: latlng.lng,
				zoom: 15,
			};
		});
	}

	ngOnInit(): void {

	}

}
