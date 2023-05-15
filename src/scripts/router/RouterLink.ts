import { ROUTER_BUS } from "./ROUTER_BUS";

customElements.define('router-link', class RouterLink extends HTMLAnchorElement {

	connectedCallback(): void {
		this.addEventListener('click', this.#onClick);
	};

	disconnectCallback(): void {
		this.removeEventListener('click', this.#onClick);
	};


	#onClick(event: MouseEvent) {
		event.preventDefault();
		ROUTER_BUS.dispatchEvent(new CustomEvent('navigate', {
			detail: {
				path: new URL(this.href).pathname,
			},
		}));
	};

}, {extends: 'a'});