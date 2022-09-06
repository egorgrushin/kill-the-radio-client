export interface IKeyValuePair<K, V> {
	key: K;
	value: V;
}

export interface IPoint {x: number; y: number; }

export const ACTUAL_API_HOST = API_HOST || window.location.hostname;
export const ACTUAL_API_PORT = API_PORT || window.location.port;

export const ACTUAL_SOCKET_HOST = SOCKET_HOST || '';
export const ACTUAL_SOCKET_PORT = SOCKET_PORT || 9000;

export const BASE_URL = `//${ACTUAL_API_HOST}:${ACTUAL_API_PORT}`;
export const SOCKET_URL = `//${ACTUAL_SOCKET_HOST}:${ACTUAL_SOCKET_PORT}`;
export const API_URL = `${BASE_URL}/${API_PREFIX}`;

if (IS_DEBUG) {
	console.log(`Started with BASE_URL: ${BASE_URL} and SOCKET_URL: ${SOCKET_URL}`);
}
