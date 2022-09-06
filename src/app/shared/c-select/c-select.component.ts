import {Component, OnInit, Input, EventEmitter, Output, ElementRef} from '@angular/core';

import {ICSelectEvent, ICSelectItem} from './c-select.types';

@Component({
	selector: 'c-select',
	templateUrl: './c-select.component.html',
	host: {
		'(document:click)': 'onDocumentClick($event)',
	},
	styleUrls: ['./c-select.component.scss'],
})
export class CSelectComponent {
	isMouseOverProcessing: any;
	lastHoveredItem: any;
	_hoveredItem: any;
	isSingle: boolean;
	keyPropName: string;
	displayPropName: string;
	_isOpened: any;
	_selectedItems: ICSelectItem[];
	_items: ICSelectItem[];

	@Input()
	set items(items) {
		this.buildItems(items);
	}

	get items() {
		return this._items;
	}

	@Input()
	set selectedItems(selectedItems) {
		this.buildSelectedItems(selectedItems);
	}

	get selectedItems() {
		return this._selectedItems;
	}

	@Input()
	set opened(opened) {
		this._isOpened = opened;
	}

	get opened() {
		return this._isOpened;
	}

	@Input()
	set hoveredItem(hoveredItem) {
		this.setHoveredItem(hoveredItem);
	}

	get hoveredItem() {
		return this._hoveredItem;
	}

	@Output() select = new EventEmitter<ICSelectEvent>();
	@Output() toggle = new EventEmitter<ICSelectEvent>();
	@Output() itemHover = new EventEmitter<ICSelectEvent>();

	// TODO make it configurable via options input
	constructor(private elementRef: ElementRef) {
		this.keyPropName = 'id';
		this.displayPropName = 'text';
		this.isSingle = true;
		this._items = [];
		this._selectedItems = [];
	}

	buildItem(item = {}) {
		return {
			source: item,
		};
	}

	buildItems(items = []) {
		this._items = items.map(item => this.buildItem(item));
		if (this._selectedItems) {
			this.buildSelectedItems(this._selectedItems);
		}
	}

	buildSelectedItems(selectedItems = []) {
		if (!this._items) return this._selectedItems = selectedItems.map(selected => this.buildItem(selected));
		this._selectedItems = selectedItems
			.filter(selected => !this._items.find(item => item[this.keyPropName] === selected[this.keyPropName]))
			.map(this.buildItem);
	}

	setHoveredItem(hoveredItem) {
		if (this._items && hoveredItem) {
			const targetItem = this._items
				.find(item => item.source[this.keyPropName] === hoveredItem[this.keyPropName]);
			if (targetItem) {
				this._hoveredItem = targetItem.source;
			}
		}
	}

	onSelect(item) {
		const index = this._items.indexOf(item);
		if (this.isSingle) {
			this._selectedItems.length = 0;
		}
		this._selectedItems.push(item);
		this.select.emit({item: item.source});
		this.toggleOpen(false, true);
	}

	toggleOpen(isOpened?: boolean, noEmit?: boolean) {
		this._isOpened = isOpened === undefined ? !this._isOpened : isOpened;
		if (!noEmit) {
			this.toggle.emit({isOpened: this._isOpened});
		}
	}

	isHover(item) {
		return this._hoveredItem && this._hoveredItem[this.keyPropName] === item.source[this.keyPropName];
	}

	onMouseOver(item) {
		if (this.isMouseOverProcessing) return;

		this.isMouseOverProcessing = true;
		this._hoveredItem = item.source;
		this.lastHoveredItem = this._hoveredItem;
		this.itemHover.emit(item.source);
		setTimeout(() => {
			this.isMouseOverProcessing = false;
		});
	}

	onDocumentClick($event) {
		if (this._isOpened) {
			if (!this.elementRef.nativeElement.contains(event.target)) {
				this.toggleOpen(false);
			}
		}
	}

}
