import type { Role } from '@sendbird/chat';
import type { UserStruct } from '../types';
export declare function ifOperator<T>(role: Role, then: T): T | undefined;
export declare function ifOperator<T, V>(role: Role, then: T, or: V): T | V;
export declare function getUserUniqId<T extends UserStruct>(user: T): string;
