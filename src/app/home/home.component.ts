import { Component } from '@angular/core';
import { BaseComponent } from '../core/base.component';
import { ILoadingState } from 'mts-store';
import { Observable } from 'rxjs/Observable';
import { SessionsView } from '../core/domain/views/sessions-view';
import { ActivityLogs } from '../core/domain/entities/activity-logs/activity-logs';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent {
	loadingState: ILoadingState = {};

	constructor() {
		super();
	}

	ngOnInit(): void {
	}

}
