import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LaddaModule } from 'angular2-ladda';
import { NgxMaskModule } from 'ngx-mask';
import { NgPipesModule } from 'ng-pipes';

import { CSelectComponent } from './c-select/c-select.component';
import { CCollapseComponent } from './c-collapse/c-collapse.component';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
	imports: [
		CommonModule,
		HttpModule,
		LaddaModule.forRoot({
			style: 'expand-left',
			spinnerSize: 20,
			spinnerColor: '#e20f00',
			spinnerLines: 12,
		}),
		NgxMaskModule,
		NgPipesModule,
		NgxErrorsModule,
	],
	declarations: [
		CSelectComponent,
		CCollapseComponent,
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		LaddaModule,
		NgxMaskModule,
		NgPipesModule,
		CSelectComponent,
		CCollapseComponent,
		NgxErrorsModule,
	],
})
export class SharedModule {
}
