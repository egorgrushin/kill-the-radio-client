import { Component } from '@angular/core';
import { BaseComponent } from '../core/base.component';
import { ILoadingState } from 'mts-store';
import { Observable } from 'rxjs/Observable';
import { Rooms } from "../core/domain/entities/rooms";
import { Router } from "@angular/router";

@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends BaseComponent {
	map: any;
	loadingState: ILoadingState = {};
	rooms: any;

	constructor(private router: Router) {
		super();
		this.getPosition((latlng) => {
			this.map = {
				lat: latlng.lat,
				lng: latlng.lng,
				zoom: 20,
			};
		});

	}

	goToRoom(roomId) {
		this.router.navigate(['room', roomId]);
	}

	ngOnInit(): void {
		Rooms.find({}, {local: false}).subscribe((rooms) => {
			this.rooms = rooms.map(room => {
				return {
					...room,
					latlng: {
						lat: +room.latlng.lat,
						lng: +room.latlng.lng,
					},
				};
			});
		});
	}

}
