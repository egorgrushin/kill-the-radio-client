import { forEach, isNil, isArray, isPlainObject, camelCase } from 'lodash';

// IMMUTABLE Replacing given value in given path in object, path can be just single key, or array of keys
export const getRecursiveObjectReplacement = (obj: any, path: string | string[], value: any | (() => any)) => {
	if (isNil(obj)) return obj;
	let currentPath;
	if (typeof path === 'string' || path.length === 1) {
		currentPath = typeof path === 'string' ? path : path[0];
		if (value instanceof Function) {
			const oldValue = obj[currentPath];
			value = value(oldValue);
		}
		return {
			...obj,
			[currentPath]: value,
		};
	}
	currentPath = path[0];
	if (!Array.isArray(obj)) {
		return {
			...obj,
			[currentPath]: getRecursiveObjectReplacement(obj[currentPath], path.slice(1), value),
		};
	}
	const newArray = obj.slice();
	newArray.splice(+currentPath, 1, getRecursiveObjectReplacement(obj[currentPath], path.slice(1), value));
	return newArray;
};

export const smartRecursiveReplacement = (state, path, newValue) => {
	return getRecursiveObjectReplacement(state, path, value => {
		return typeof newValue === 'object' ? {...value, ...newValue} : newValue;
	});
};

export const getNestedObjectField = (obj, path: string | string[]) => {
	if (!obj) return undefined;
	if (typeof path === 'string') return obj[path];
	return path.reduce((memo, currentPath) => {
		return memo ? memo[currentPath] : undefined;
	}, obj);
};

export const getCopy = (obj) => {
	if (isNil(obj)) return obj;
	if (Array.isArray(obj)) return obj.slice();
	if (obj === Object(obj)) return {...obj};
	return obj;
};

export const toCamelCase = (snakeCaseObject) => {
	if (isArray(snakeCaseObject)) {
		return snakeCaseObject.map(val => toCamelCase(val));
	}
	if (isPlainObject(snakeCaseObject)) {
		return Object.keys(snakeCaseObject).reduce((memo, key) => {
			memo[camelCase(key)] = toCamelCase(snakeCaseObject[key]);
			return memo;
		}, {});
	}
	return snakeCaseObject;
};

export const toTitleCase = (camelCaseObject) => {
	const titleCaseObject = {};
	forEach(camelCaseObject, (value, key) => {
		// checks that a value is a plain object or an array - for recursive key conversion
		if (isPlainObject(value) || isArray(value)) {
			// recursively update keys of any values that are also objects
			value = toTitleCase(value);
		}
		const newKey = typeof key === 'number' ? key : `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
		titleCaseObject[newKey] = value;
	});
	return titleCaseObject;
};
