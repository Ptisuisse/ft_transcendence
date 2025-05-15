import '../style.css';

export function LoginPage(): HTMLElement {
  const element = document.createElement('div');
  // Centrage vertical/horizontal
  element.className = 'flex justify-center items-center min-h-screen';

  const CLIENT_ID = '466591943367-vfpoq4upenktcjdtb0kv0hd7mc8bidrt.apps.googleusercontent.com';

  // Container principal
  const container = document.createElement('div');
  container.className = 'bg-zinc-900 border-2 border-indigo-400 rounded-xl p-10 max-w-md mx-auto shadow-lg flex flex-col items-center';

  // Titre
  const title = document.createElement('h2');
  title.className = 'text-3xl font-bold text-white mb-8';
  title.innerText = 'Login';

  // Google onload
  const gIdOnload = document.createElement('div');
  gIdOnload.id = 'g_id_onload';
  gIdOnload.setAttribute('data-client_id', CLIENT_ID);
  gIdOnload.setAttribute('data-context', 'signin');
  gIdOnload.setAttribute('data-ux_mode', 'popup');
  gIdOnload.setAttribute('data-callback', 'handleCredentialResponse');
  gIdOnload.setAttribute('data-auto_prompt', 'false');

  // Google Signin button
  const gIdSignin = document.createElement('div');
  gIdSignin.className = 'g_id_signin';
  gIdSignin.setAttribute('data-type', 'standard');
  gIdSignin.setAttribute('data-shape', 'rectangular');
  gIdSignin.setAttribute('data-theme', 'outline');
  gIdSignin.setAttribute('data-text', 'signin_with');
  gIdSignin.setAttribute('data-size', 'large');
  gIdSignin.setAttribute('data-logo_alignment', 'left');

  // Status message
  const statusMessage = document.createElement('p');
  statusMessage.id = 'status-message';
  statusMessage.className = 'text-white mt-4';
  statusMessage.innerText = 'Waiting for authentication...';

  // Sign out button
  const signOutButton = document.createElement('button');
  signOutButton.id = 'sign-out-button';
  signOutButton.className = 'mt-6 px-6 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition hidden';
  signOutButton.innerText = 'Sign Out';
  signOutButton.addEventListener('click', () => signOut());

  // Ajout des éléments au container
  container.appendChild(title);
  container.appendChild(gIdOnload);
  container.appendChild(gIdSignin);
  container.appendChild(statusMessage);
  container.appendChild(signOutButton);

  // Ajout du container à la page
  element.appendChild(container);

  // Ajout du script Google Identity Services
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  // Callback global pour Google
  (window as any).handleCredentialResponse = (response: any) => {
    const jwt = response.credential;

    fetch('api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jwt })
    })
      .then(res => res.json())
      .then(data => {
        statusMessage.innerHTML = '';
        if (data.picture) {
          const profileImg = document.createElement('img');
          profileImg.src = data.picture;
          profileImg.alt = "Profile picture";
          profileImg.id = "profile-picture";
          profileImg.className = 'w-32 h-32 rounded-full mx-auto block mb-8 -mt-4 shadow-lg';
          statusMessage.appendChild(profileImg);
        }
        const textNode = document.createElement('span');
        textNode.textContent = ` Signed in as: ${data.name}`;
        textNode.style.marginLeft = '10px';
        statusMessage.appendChild(textNode);

        signOutButton.style.display = 'block';
        gIdSignin.style.display = 'none';
      })
      .catch(error => {
        console.error('Erreur lors de lenvoi au backend:', error);
      });

    gIdSignin.style.display = 'none';
    signOutButton.style.display = 'block';
  };

  return element;
}

function signOut() {
  const statusMessage = document.getElementById('status-message');
  if (statusMessage) {
    statusMessage.innerHTML = "Signed out";
  }
  const signOutButton = document.getElementById('sign-out-button');
  if (signOutButton) {
    signOutButton.style.display = 'none';
  }
  let signInButton = document.querySelector('.g_id_signin');
  if (!signInButton) {
    signInButton = document.createElement('div');
    signInButton.className = 'g_id_signin';
    signInButton.setAttribute('data-type', 'standard');
    signInButton.setAttribute('data-shape', 'rectangular');
    signInButton.setAttribute('data-theme', 'outline');
    signInButton.setAttribute('data-text', 'signin_with');
    signInButton.setAttribute('data-size', 'large');
    signInButton.setAttribute('data-logo_alignment', 'left');
    const onloadDiv = document.getElementById('g_id_onload');
    if (onloadDiv && onloadDiv.parentNode) {
      onloadDiv.parentNode.insertBefore(signInButton, onloadDiv.nextSibling);
    }
  } else {
    (signInButton as HTMLElement).style.display = 'block';
  }
  console.log("User signed out");
}