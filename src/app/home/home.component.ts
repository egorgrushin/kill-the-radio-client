import { Component } from '@angular/core';
import { BaseComponent } from '../core/base.component';
import { ILoadingState } from 'mts-store';
import { Observable } from 'rxjs/Observable';
import { Rooms } from "../core/domain/entities/rooms";
import { Router } from "@angular/router";

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent {
	loadingState: ILoadingState = {};

	constructor(private router: Router) {
		super();
	}

	killTheRadio() {
		this.getPosition((latlng) => {
			Rooms.create({
				latlng,
			}, {isOptimistic: false}).subscribe((res) => {
				this.router.navigate(['room', res.data.id]);
			});
		});
	}

	ngOnInit(): void {
		Rooms.getState().subscribe(ls => {
			this.loadingState = ls;
		})
	}

}
