import { GuardClass } from "./GuardClass";
import { GuardFunction } from "./GuardFunction";
import { PageClass } from "./PageClass";
import { ResolverClass } from "./ResolverClass";
import { ResolverFunction } from "./ResolverFunction";

export interface RouteConfig {
	path: string;
	page?: PageClass;
	redirectTo?: string;
	guards?: (GuardFunction | GuardClass)[];
	resolve?: Record<string, ResolverFunction | ResolverClass>;
};