import { ActivatedRouteState } from "./ActivatedRouteState";
import { RedirectPath } from "./RedirectPath";

export interface Guard {
	canActivate(state: ActivatedRouteState): boolean | Promise<boolean> | RedirectPath | Promise<RedirectPath>;
};