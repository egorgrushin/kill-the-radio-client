// augmentations.ts
// TODO: Remove this when RxJS releases a stable version with a correct declaration of `Subject`.
// import { Operator } from 'rxjs/Operator';
// import { Observable } from 'rxjs/Observable';

declare const ENV: string;
declare const IS_DEBUG: boolean;
declare const HOST: string;
declare const PORT: number;
declare const API_HOST: string;
declare const API_PORT: number;
declare const API_PREFIX: string;
declare const SOCKET_HOST: string;
declare const SOCKET_PORT: number;
declare const BASE_HREF: string;
declare const HMR: boolean;
declare const AOT: boolean;

// declare module 'rxjs/Subject' {
// 	interface Subject<T> {
// 		lift<R>(operator: Operator<T, R>): Observable<R>
// 	}
// }
