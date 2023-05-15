import { AbstractPage } from "../AbstractPage";

export class DraftPage extends AbstractPage {

	#content = document.createElement('div');

	render(): HTMLElement | DocumentFragment {

		this.#content.innerHTML = `
		<h2 class="draft_title">Draft</h2>
		<p id="textOfNoneDraft">There draft is empty</p>
		<ul id="draftList"></ul>
		`;

		return this.#content;
	};

	onRender(): void {
		const textOfNoneDraft = this.#content.querySelector('#textOfNoneDraft')! as HTMLParagraphElement;
		const draftList = this.#content.querySelector('#draftList')! as HTMLElement;

		const draftStorage = localStorage.getItem('For Draft');
		let draftObject: any;
		if (draftStorage) {
			draftObject = JSON.parse(draftStorage);
			textOfNoneDraft.style.display = 'none';
			draftList.style.display = 'block';
		};

		let correctDate: string;
	function changeFormatDate (storageDate: string): string {
		let newDate = storageDate.split('-').reverse().join('.');
		correctDate = newDate;
		return newDate;
	};

		const createDraft = () => {
			const newDraftOptionFirst = document.createElement('li');
			newDraftOptionFirst.className = 'option_draft';
			newDraftOptionFirst.appendChild(document.createTextNode(`Date: ${changeFormatDate(draftObject.Date)}`));
			draftList.appendChild(newDraftOptionFirst);

			const newDraftOptionSecond = document.createElement('li');
			newDraftOptionSecond.className = 'option_draft';
			newDraftOptionSecond.appendChild(document.createTextNode(`Time: ${(draftObject.Time)}`));
			draftList.appendChild(newDraftOptionSecond);

			const newDraftOptionThird = document.createElement('li');
			newDraftOptionThird.className = 'option_draft';
			newDraftOptionThird.appendChild(document.createTextNode(`Cost: ${(draftObject.Cost)}`));
			draftList.appendChild(newDraftOptionThird);

			const newDraftOptionFourth = document.createElement('li');
			newDraftOptionFourth.className = 'option_draft';
			newDraftOptionFourth.appendChild(document.createTextNode(`Address: ${(draftObject.Address)}`));
			draftList.appendChild(newDraftOptionFourth);

			const newDraftOptionFifth = document.createElement('li');
			newDraftOptionFifth.className = 'option_draft';
			if (draftObject.Notes) {
				newDraftOptionFifth.appendChild(document.createTextNode(`Notes: ${(draftObject.Notes)}`));
			} else {
				newDraftOptionFifth.appendChild(document.createTextNode('Notes: There are no notes'));
			}
			draftList.appendChild(newDraftOptionFifth);

			const newDraftOptionSixth = document.createElement('li');
			newDraftOptionSixth.className = 'option_draft';
			newDraftOptionSixth.appendChild(document.createTextNode(`Status: ${(localStorage.getItem('Completed'))}`));
			draftList.appendChild(newDraftOptionSixth);
		};

		createDraft();
	};
};