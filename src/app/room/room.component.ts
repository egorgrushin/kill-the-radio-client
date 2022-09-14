import { Component } from '@angular/core';
import { BaseComponent } from '../core/base.component';
import { ILoadingState } from 'mts-store';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss'],
})
export class RoomComponent extends BaseComponent {
	loadingState: ILoadingState = {};

	constructor() {
		super();
	}

	ngOnInit(): void {
	}

}
