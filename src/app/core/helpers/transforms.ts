export const generateConstMap = (map, prop) => Object.keys(map).reduce((memo: any, entityKey) => {
	memo[entityKey] = map[entityKey][prop];
	return memo;
}, {});
