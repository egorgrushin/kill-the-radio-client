import { Injectable } from '@angular/core';
import { overlayConfigFactory } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Injectable()
export class ModalService {

	constructor(private modal: Modal) { }

	open(componentType, context, contextType) {
		context.dialogClass = context.dialogClass || '';
		context.dialogClass += ` modal-dialog c-modal c-modal--${context.size}`;
		context.size = undefined;
		return this.modal.open(componentType, overlayConfigFactory(context, contextType));
	}

	confirm(title, body) {
		return this.modal.confirm()
			.size('sm')
			.isBlocking(true)
			.showClose(true)
			.keyboard(27)
			.title(title)
			.body(body)
			.okBtn('Да')
			.okBtnClass('c-button c-button--s c-button--fail c-button--margin')
			.cancelBtnClass('c-button c-button--s c-button--margin')
			.cancelBtn('Отмена')
			.open()
			.then(dialogRef => dialogRef.result);
	}
}
