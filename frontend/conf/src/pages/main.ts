import '../style.css';
import typescriptLogo from '../typescript.svg';
import viteLogo from '../../public/vite.svg';
import { setupCounter } from '../counter';

export function HomePage(): HTMLElement {
  const pageContainer = document.createElement('div');
  
  pageContainer.innerHTML = `
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
      </a>
      <h1>Vite + TypeScript</h1>
      <div class="card">
        <button id="counter" type="button"></button>
      </div>
      <p class="read-the-docs">
        Click on the Vite and TypeScript logos to learn more
      </p>
    </div>
  `;
  
  // Initialize the counter button after the DOM is ready
  const counterButton = pageContainer.querySelector<HTMLButtonElement>('#counter');
  if (counterButton) {
    setupCounter(counterButton);
  }

  return pageContainer;
}
