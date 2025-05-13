import '../style.css';

export function LoginPage(): HTMLElement {
  const element = document.createElement('div');
  
  element.innerHTML = `
    <div>
      <h1> login </h1>
    </div>
  `;
  
  return element;
}

