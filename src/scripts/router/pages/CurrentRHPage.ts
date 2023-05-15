import { AbstractPage } from "../AbstractPage";

export class CurrentRHPage extends AbstractPage {

	#content = document.createElement('div');

	render(): HTMLElement | DocumentFragment {

		this.#content.innerHTML = `
		<h2 class="current_rehearsal_title">Current Rehearsal</h2>
		<p id="textOfNone">There is no current rehearsal</p>
		<div id="currentBlock">
			<div class="flex_top-cur">
				<div class="flex_top_left-cur">
					<div class="image_and_current-cur">
						<img src="../images/kalendar.png" alt="Calendar Icon" class="icon_current-cur" />
						<div class="container_content">
							<span class="current_value-cur">Date:</span>
							<p id="dateOfRehearsal"></p>
						</div>
					</div>
				</div>
				<div class="flex_top_middle-cur">
					<div class="image_and_current-cur">
						<img src="../images/1497849.png" alt="Clock icon" class="icon_current-cur" />
						<div class="container_content">
							<span class="current_value-cur">Time:</span>
							<p id="timeOfRehearsal"></p>
						</div>
					</div>
				</div>
				<div class="flex_top_right-cur">
					<div class="image_and_current-cur">
						<img src="../images/2933038.png" alt="Coin icon" class="icon_current-cur" />
						<div class="container_content">
							<span class="current_value-cur">Cost:</span>
							<p id="costOfRehearsal"></p>
							<p id="costPerPersone"></p>
						</div>
					</div>
				</div>
			</div>
			<div class="middle">
				<div class="image_and_current-cur">
					<img src="../images/kisspng-google-maps-computer-icons-maps-5abc3a7a261239.322842121522285178156-removebg-preview.png" alt="Map icon" class="icon_current_address" />
					<div class="container_content">
						<span class="current_value_address">Address:</span>
						<p id="addressOfRehearsal"></p>
					</div>
				</div>
			</div>
			<div class="notes">
				<h3 class="notes_title">Your notes:</h3>
				<p id="notesOfRehearsal"></p>
			</div>
			<div class="buttons_flex">
				<button id="completedButton" type="submit">Completed</button>
				<button id="notCompletedButton" type="submit">Not completed</button>
			</div>
		</div>
		`;

		return this.#content;
	}

	onRender(): void {
		const textOfNone = this.#content.querySelector('#textOfNone')! as HTMLParagraphElement;
		const currentBlock = this.#content.querySelector('#currentBlock')! as HTMLDivElement;
		const dateOfRehearsal = this.#content.querySelector('#dateOfRehearsal')!;
		const timeOfRehearsal = this.#content.querySelector('#timeOfRehearsal');
		const costOfRehearsal = this.#content.querySelector('#costOfRehearsal');
		const costPerPersone = this.#content.querySelector('#costPerPersone');
		const addressOfRehearsal = this.#content.querySelector('#addressOfRehearsal');
		const notesOfRehearsal = this.#content.querySelector('#notesOfRehearsal')! as HTMLParagraphElement;
		const completedButton = this.#content.querySelector('#completedButton');
		const notCompletedButton = this.#content.querySelector('#notCompletedButton');

		const reservationInfo = localStorage.getItem('Reserv Info')!;

		let reservationObject: any;
		if (reservationInfo) {
			reservationObject = JSON.parse(reservationInfo);
			textOfNone.style.display = 'none';
			currentBlock.style.display = 'block';
		};

	let correctDate: string;
	function changeFormatDate (storageDate: string): string {
		let newDate = storageDate.split('-').reverse().join('.');
		correctDate = newDate;
		return newDate;
	};

	const informationOnPage = (): void => {
		dateOfRehearsal!.textContent = changeFormatDate(reservationObject.Date);
		timeOfRehearsal!.textContent = reservationObject.Time;
		costOfRehearsal!.textContent = `${reservationObject.Cost} BYN`;
		costPerPersone!.textContent = `${Number(reservationObject.Cost) / 4} BYN per person`;
		addressOfRehearsal!.textContent = reservationObject.Address;
		notesOfRehearsal!.textContent = reservationObject.Notes;
		if (!reservationObject.Notes) {
			notesOfRehearsal!.textContent = 'There are no notes';
			notesOfRehearsal.style.textAlign = 'center';
		}
	};

	informationOnPage();

	if (!localStorage.getItem('Number Complete') && !localStorage.getItem('Number Not Complete')) {
		localStorage.setItem('Number Complete', String(0));
		localStorage.setItem('Number Not Complete', String(0));
	};

	if (!localStorage.getItem('Number Cost')) {
		localStorage.setItem('Number Cost', String(0));
	}

		const removeContentSuccess = () => {
			localStorage.setItem('For Draft', reservationInfo);
			localStorage.setItem('Completed', 'Completed');
			localStorage.setItem('Statistics', 'Yes');
			localStorage.removeItem('Reserv Info');

			currentBlock.style.display = 'none';
			textOfNone.style.display = 'block';
			
			const currentNumber = localStorage.getItem('Number Complete');
			localStorage.setItem('Number Complete', String(Number(currentNumber) + 1));

			const currentCost = localStorage.getItem('Number Cost');
			localStorage.setItem('Number Cost', String(Number(currentCost) + Number(reservationObject.Cost)));
		};

		const removeContentUnsuccess = () => {
			localStorage.setItem('For Draft', reservationInfo);
			localStorage.setItem('Completed', 'Not completed');
			localStorage.setItem('Statistics', 'No');
			localStorage.removeItem('Reserv Info');

			currentBlock.style.display = 'none';
			textOfNone.style.display = 'block';

			const currentNumber = localStorage.getItem('Number Not Complete');
			localStorage.setItem('Number Not Complete', String(Number(currentNumber) + 1));

			const currentCost = localStorage.getItem('Number Cost');
			localStorage.setItem('Number Cost', String(Number(currentCost) + Number(reservationObject.Cost)));
		};

		completedButton?.addEventListener('click', removeContentSuccess);
		notCompletedButton?.addEventListener('click', removeContentUnsuccess);
	};
};