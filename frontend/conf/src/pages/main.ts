import '../style.css';
import {boxImages} from '../components/imgBox.ts'

export function HomePage(): HTMLElement {
	const pageContainer = document.createElement('div');

	//Box name
	const Pptizini = boxImages();
	Pptizini.innerText = "Ppitzini";
	pageContainer.appendChild(Pptizini);
	const Pirulenc = boxImages();
	Pirulenc.innerText = "Pirulenc";
	pageContainer.appendChild(Pirulenc);
	const Lvanslu = boxImages();
	Lvanslu.innerText = "Lvan-slu";
	pageContainer.appendChild(Lvanslu);

	//

	return pageContainer;
}

