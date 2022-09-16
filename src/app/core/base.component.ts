import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, Validators } from '@angular/forms';
import { values } from 'lodash';

export class BaseComponent implements OnDestroy {
	subscriptions: Subscription[] = [];
	private ruleToValidator = {
		required: () => Validators.required,
	};

	trackByProp(prop = 'id') {
		return entity => entity ? entity[prop] : null;
	}

	setValidationRules(form: FormGroup, rules) {
		Object.keys(form.controls).forEach((key) => {
			const control = form.controls[key];
			const rulesDefinition = rules[key];
			if (rulesDefinition) {
				const validators = rulesDefinition.rules.map((rule) => {
					const ruleType = Object.keys(rule)[0];
					const ruleValue = rule[ruleType];
					return this.ruleToValidator[ruleType](ruleValue);
				});
				if (validators.length > 0) {
					control.setValidators(validators);
					control.updateValueAndValidity();
				}
			}
		});
	}

	validateAndSubmit(form: FormGroup): Promise<any> {
		return new Promise((resolve, reject) => {
			const validationMap = Object.keys(form.controls).reduce((memo, key) => {
				const control = form.controls[key];
				control.markAsDirty();
				memo[key] = control.valid;
				return memo;
			}, {});
			if (!values(validationMap).includes(false)) resolve();
		});
	}

	getPosition(callback) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const latlng = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				callback(latlng);
			});
		}
		;
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(s => s.unsubscribe());
	}
}
