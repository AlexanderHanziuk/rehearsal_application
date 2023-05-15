import { AbstractPage } from "../AbstractPage";

export class StatisticsPage extends AbstractPage {

	#content = document.createElement('div');

	render(): HTMLElement | DocumentFragment {

		this.#content.innerHTML = `
		<h2 class="statistics_title">All Statistics</h2>
		<div class="flex_top">
			<div class="flex_top_left">
				<div class="image_and_current_complete">
					<img src="./images/png-clipart-check-mark-tick-case-closed-miscellaneous-angle-removebg-preview.png" alt="Green checkmark" class="icon_current" />
					<span id="currentValueComplete"></span>
				</div>
				<p class="flex_top_paragraph">Number of rehearsals held</p>
			</div>
			<div class="flex_top_right">
				<div class="image_and_current">
					<img src="./images/d587208d69ea362e61a174f9c628dd48-removebg-preview.png" alt="Red checkmark" class="icon_current" />
					<span id="currentValueNotComplete"></span>
				</div>
				<p class="flex_top_paragraph">Number of canceled rehearsals</p>
			</div>
		</div>
		<div class="flex_bottom">
			<div class="flex_bottom_left">
				<div class="image_and_current">
					<img src="../images/2933038.png" alt="Dollar icon" class="icon_current" />
					<span id="currentValueCost"></span>
				</div>
				<p class="flex_bottom_paragraph">Amount of costs</p>
			</div>
			<div class="flex_bottom_right">
				<div class="image_and_current">
					<img src="../images/w512h5121380476683banknote.png" alt="Red checkmark" class="icon_current" />
					<span id="currentValueCostPerson"></span>
				</div>
				<p class="flex_bottom_paragraph">Amount of costs per person</p>
			</div>
		</div>
		`;
		return this.#content;
	}

	onRender(): void {
		const completeContainer = this.#content.querySelector('.image_and_current_complete');
		const currentValueComplete = this.#content.querySelector('#currentValueComplete');
		const currentValueNotComplete = this.#content.querySelector('#currentValueNotComplete');
		const currentValueCost = this.#content.querySelector('#currentValueCost');
		const currentValueCostPerson = this.#content.querySelector('#currentValueCostPerson');

		const statisticsStatus = localStorage.getItem('Statistics');

		if (statisticsStatus === "Yes") {
			currentValueComplete!.textContent = localStorage.getItem('Number Complete');
		} else if (statisticsStatus === 'No') {
			currentValueNotComplete!.textContent = localStorage.getItem('Number Not Complete');
		}
		

		currentValueComplete!.textContent = String(Number(localStorage.getItem('Number Complete')));
		currentValueNotComplete!.textContent = String(Number(localStorage.getItem('Number Not Complete')));

		
		currentValueCost!.textContent = String(Number(localStorage.getItem('Number Cost'))) + ' ' + 'BYN';
		currentValueCostPerson!.textContent = String(Number(localStorage.getItem('Number Cost')) / 4) + ' ' + 'BYN';
	}
};
