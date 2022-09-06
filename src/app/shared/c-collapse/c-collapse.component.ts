import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'c-collapse',
	templateUrl: 'c-collapse.component.html',
	styleUrls: ['c-collapse.component.scss'],
})

export class CCollapseComponent implements OnInit {
	isCollapsed: boolean = true;

	constructor() { }

	ngOnInit() { }
}
