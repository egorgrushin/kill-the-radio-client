import { Component } from '@angular/core';
import { BaseComponent } from '../core/base.component';
import { ILoadingState } from 'mts-store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from "@angular/router";
import { Rooms } from "../core/domain/entities/rooms";

@Component({
	selector: 'room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss'],
})
export class RoomComponent extends BaseComponent {
	loadingState: ILoadingState = {};
	room: any;

	constructor(private route: ActivatedRoute) {
		super();
	}

	ngOnInit(): void {
		this.route.paramMap.map(p => p.get('id'))
			.switchMap((id) => Rooms.getById(id, {local: false}))
			.subscribe(room => {
				console.log(this.room);
				this.room = room;
			});
		// if ()
		// Room.find;
	}

}
