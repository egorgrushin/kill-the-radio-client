import { kebabCase } from 'lodash';
export class StoreService {

	static registerType(type: string, ...strings: string[]): string {
		const base = `@app/${kebabCase(type)}`;
		const stringsToLower = strings.map(s => kebabCase(s));
		const remaining = stringsToLower.length > 0 ? `/${stringsToLower.join('/')}` : '';
		const full = `${base}${remaining}`;
		if (this.typeCache[full]) {
			throw new Error(`Action type "${full}" is not unique"`);
		}

		this.typeCache[full] = true;
		return full;
	}

	private static typeCache: { [label: string]: boolean } = {};

	constructor() { }

}
