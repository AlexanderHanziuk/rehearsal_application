import { AbstractPage } from "../AbstractPage";

export class ReservationPage extends AbstractPage {
	#content = document.createElement('div');

	render(): HTMLElement | DocumentFragment {

		this.#content.innerHTML = `
		<h2 class="reservation_title">Reservation</h2>
		<p id="textOfNoneReservation">The reservation was successfull</p>

		<div id="containerReservation">

			<form action="">
				<label for="chooseDate"><span class="formText">Choose date:</span></label>
				<br />
				<input type="date" value="2023-04-30" name="chooseDate" id="chooseDate"/>
				<br />
				<label for="chooseTime"><span class="formText">Choose time</span></label>
				<br />
				<input type="time" name="chooseTime" id="chooseTime" required />
				<br />
				<label for="costSpecify"><span class="formText">How much will it cost?</span></label>
				<br />
				<input type="number" name="costSpecify" id="costSpecify" placeholder="Specify a cost"/><span
					class="currency">BYN</span>
				<br />
				<label for="chooseAdress"><span class="formText">Choose adress</span></label>
				<br />
				<input type="text" name="chooseAdress" id="chooseAdress" placeholder="Specify an adress"/>
				<br />
				<label for="noticeField"><span class="formText">Write notes (if necessary)</span></label>
				<br />
				<textarea name="noticeField" id="noticeField" cols="30" rows="10"></textarea>
				<br />
				<input type="button" id="buttonReserve" value="Reserve" />
				<span id="no">Please, fill in all required fields!</span>
			</form>
		</div>
		`;

		return this.#content;
	}

	onRender(): void {
		const containerReservation = this.#content.querySelector('#containerReservation')! as HTMLDivElement;
		const chooseDate = this.#content.querySelector('#chooseDate')! as HTMLDataElement;
		const chooseTime = this.#content.querySelector('#chooseTime')! as HTMLInputElement;
		const costSpecify = this.#content.querySelector('#costSpecify')! as HTMLInputElement;
		const chooseAdress = this.#content.querySelector('#chooseAdress')! as HTMLInputElement;
		const noticeField = this.#content.querySelector('#noticeField')! as HTMLTextAreaElement;
		const buttonReserve = this.#content.querySelector('#buttonReserve');
		const textOfNoneReservation = this.#content.querySelector('#textOfNoneReservation')! as HTMLParagraphElement;
		const no = this.#content.querySelector('#no')! as HTMLSpanElement;

		const reserveRehearsal = () => {
			if (!chooseDate.value || !chooseTime.value || !costSpecify.value || !chooseAdress.value) {
				return no.style.display = 'inline';
			};

			let informationObject = {
				Date: chooseDate.value,
				Time: chooseTime.value,
				Cost: costSpecify.value,
				Address: chooseAdress.value,
				Notes: noticeField.value,
			};

			localStorage.setItem('Reserv Info', JSON.stringify(informationObject));

			containerReservation.style.display = 'none';
			textOfNoneReservation.style.display = 'block';
		};

		buttonReserve?.addEventListener('click', reserveRehearsal);
	};
};