import { AbstractPage } from "./AbstractPage";
import { ActivatedRouteState } from "./ActivatedRouteState";
import { Guard } from "./Guard";
import { GuardClass } from "./GuardClass";
import { GuardFunction } from "./GuardFunction";
import { PathParams } from "./PathParams";
import { ROUTER_BUS } from "./ROUTER_BUS";
import { RedirectPath } from "./RedirectPath";
import { resolvePath } from "./ResolvePath";
import { ResolvedData } from "./ResolvedData";
import { Resolver } from "./Resolver";
import { ResolverClass } from "./ResolverClass";
import { ResolverFunction } from "./ResolverFunction";
import { RouteConfig } from "./RouteConfig";
import { createPathRegExp } from "./createPathRegExp";

export class Router {
	readonly #routes = new Map<RegExp, RouteConfig>();

	readonly #guardInstances = new WeakMap<GuardClass, Guard>();
	readonly #resolverInstances = new WeakMap<ResolverClass, Resolver>();
	#activePage: AbstractPage | null = null;

	constructor(routes: RouteConfig[]) {
		routes.forEach((route) => {
			this.#routes.set(createPathRegExp(route.path), route);
		});
	};

	navigate(path: string) {
		const absolutePath = resolvePath(location.pathname, path);
		const [route, params] = this.#findRoute(absolutePath);

		if (route) {
			void this.#handleRoute(absolutePath, route, params ?? {});
		};
	};

	start(): void {
		this.navigate(location.pathname);
		ROUTER_BUS.addEventListener('navigate', (event: Event) => {
			const { detail: { path } } = event as CustomEvent<{ path: string }>;

			this.navigate(path);
		});
	};

	#findRoute(path: string): [RouteConfig | null, PathParams | null] {
		for (const [regExp, routeConfig] of this.#routes) {
			const execResult = regExp.exec(path);

			if (execResult) {
				return [routeConfig, execResult.groups ?? null];
			};
		};

		return [null, null];
	};

	async #handleRoute(path: string, route: RouteConfig, routeParams: PathParams) {
		const activatedRouteState: ActivatedRouteState = {
			url: new URL(path, location.origin).toString(),
			params: routeParams,
			resolvedData: null,
		};

		ROUTER_BUS.dispatchEvent(new CustomEvent('navigatestart'));

		const guardResult = await this.#checkGuards(route, activatedRouteState);

		if (!guardResult) {
			ROUTER_BUS.dispatchEvent(new CustomEvent('navigatecancel'));
			return;
		};

		if (guardResult instanceof RedirectPath) {
			return this.navigate(guardResult.toString());
		};

		activatedRouteState.resolvedData = await this.#checkResolvers(route, activatedRouteState);

		if (route.redirectTo) {
			return this.navigate(route.redirectTo);
		};

		if (route.page) {
			const page = new route.page(activatedRouteState);
			const content = page.render();

			this.#activePage?.onDestroy();
			this.#activePage = page;
			ROUTER_BUS.dispatchEvent(new CustomEvent('navigateend', {
				detail: { content },
			}));
			this.#activePage?.onRender();

			history.pushState({}, '', activatedRouteState.url);
		};
	};

	async #checkGuards({ guards }: RouteConfig, state: ActivatedRouteState): Promise<boolean | RedirectPath> {
		if (!guards || !guards.length) {
			return true;
		};

 		for (const guard of guards) {
			const result = await this.#invokeGuard(guard, state);

			if (result !== true) {
				return result;
			};
		};

		return true;
	};

	#invokeGuard(guard: GuardFunction | GuardClass, state: ActivatedRouteState) {
		if (isClass(guard)) {
			if (!this.#guardInstances.has(guard)) {
				this.#guardInstances.set(guard, new guard());
			};

			return this.#guardInstances.get(guard)!.canActivate(state);
		};
		return guard(state);
	};

	async #checkResolvers ({ resolve }: RouteConfig, state: ActivatedRouteState): Promise<null | ResolvedData> {
		if (!resolve) {
			return null;
		};

		return Promise
			.all(
				Object
					.entries(resolve)
					.map(([name, resolver]) => {
						return this.#invokeResolver(resolver, state).then((value) => [name, value]);
					})
			)
			.then((resultEntries) => Object.fromEntries(resultEntries));
	};

	async #invokeResolver (resolver: ResolverFunction | ResolverClass, state: ActivatedRouteState): Promise<unknown> {
		if (isClass(resolver)) {
			if (!this.#resolverInstances.has(resolver)) {
				this.#resolverInstances.set(resolver, new resolver());
			};

			return this.#resolverInstances.get(resolver)!.resolve(state);
		};
		return resolver(state);
	};
};



function isClass<T> (value: CallableFunction | { new(...args: any[]): T}): value is { new(...args: any[]): T} {
	return typeof value === 'function' && /^class /.test(value.toString());
}; 