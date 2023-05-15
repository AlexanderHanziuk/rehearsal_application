import { ActivatedRouteState } from "./ActivatedRouteState";
import { RedirectPath } from "./RedirectPath";

export interface GuardFunction {
	(state: ActivatedRouteState): boolean | Promise<boolean> | RedirectPath | Promise<RedirectPath>;
};