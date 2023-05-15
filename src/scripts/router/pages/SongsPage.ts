import { AbstractPage } from "../AbstractPage";


export class SongsPage extends AbstractPage {

	#content = document.createElement('div');

	render(): HTMLElement | DocumentFragment {

		this.#content.innerHTML = `
		<h2 class="songs_title">Songs</h2>

		<label for="nameOfBand"></label>
		<input type="text" id="nameOfBand" name="nameOfBand" placeholder="Name of your band" />
		<button id="buttonRememberBand">Remember</button>
		<span class="success">The group name was successfully saved</span>
		<ol id="songList">

		</ol>

		<label for="textField"><span class="enter_song">Enter the song:</span></label>
		<br />
		<textarea name="textField" id="textField" cols="30" rows="10"></textarea>
		<br />
		<button type="submit" id="buttonSave">Save</button>
		<span id="writeNameSong">Please, write the name of the song!</span>
		`;
		return this.#content;
	}

	onRender(): void {
		const infoTextArea = this.#content.querySelector('#textField')! as HTMLTextAreaElement;
		const buttonSave = this.#content.querySelector('#buttonSave');
		const songList: any = this.#content.querySelector('#songList')!;
		const nameOfBand = this.#content.querySelector('#nameOfBand')! as HTMLInputElement;
		const rememberButton = this.#content.querySelector('#buttonRememberBand');
		const successSave = this.#content.querySelector('.success')! as HTMLElement;
		const writeNameSong = this.#content.querySelector('#writeNameSong')! as HTMLSpanElement;


		if (!localStorage.getItem('name')) {
			localStorage.setItem('name', 'Unknown group');
		};

		let rememberName: string;

		function saveSuccess (): void {
			rememberName = nameOfBand.value;
			localStorage.setItem('name', rememberName);
			if (!rememberName) {
				localStorage.setItem('name', 'Unknown group');
			};
			successSave.style.display = 'inline';
			setTimeout(() => {
				successSave.style.display = 'none';
			}, 2_000)
			nameOfBand.value = '';
		};

		const checkFunction = (newString: string): string => {
			const info = infoTextArea.value;
			const newArray = info.split('-');
			if (newArray[0] !== `${localStorage.getItem('name')} `) {
				newString = `${localStorage.getItem('name')} - ${infoTextArea.value}`;
			};
			return newString;
		};

		let contentList: any;

		function createList () {
			const information = infoTextArea.value;
			if (!information) {
				writeNameSong.style.display = 'inline';
				setTimeout(() => {
					writeNameSong.style.display = 'none';
				}, 2_000);
				return;
			};
			const newOption = document.createElement('li');
			newOption.className = 'list_option';
			newOption.appendChild(document.createTextNode(checkFunction(information)));
			const newButton = newOption.appendChild(document.createElement('button'));
			newButton.className = 'remove_btn';
			newButton.textContent = 'Remove';
			newButton.addEventListener('click', () => {
				newOption.remove();
				contentList = songList?.innerHTML;
				localStorage.setItem('List', contentList);
			});
			songList.style.border = '8px solid black';
			songList.appendChild(newOption);
			contentList = songList.innerHTML;
			localStorage.setItem('List', contentList);
			infoTextArea.value = '';
		};

		rememberButton?.addEventListener('click', saveSuccess);
		buttonSave?.addEventListener('click', createList);

		songList.innerHTML = localStorage.getItem('List');
	};
};