import '../style.css';

export function PongPage(): HTMLElement {
  const element = document.createElement('div');
  
  element.innerHTML = `
    <div>
      <h1> pong </h1>
    </div>
  `;
  
  return element;
}
