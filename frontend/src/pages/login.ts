import '../style.css';
import { navigateTo } from '../routes';

export function LoginPage(): HTMLElement {
  const element = document.createElement('div');
  // Centrage vertical/horizontal
  element.className = 'Parent p-5';

  const CLIENT_ID = '466591943367-vfpoq4upenktcjdtb0kv0hd7mc8bidrt.apps.googleusercontent.com';

  // Container principal
  const container = document.createElement('div');
  container.className = 'md:mt-60 mt-20 bg-zinc-900 border-2 border-indigo-400 rounded-xl p-10 max-w-md mx-auto shadow-lg flex flex-col items-center';

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
  gIdSignin.style.display = 'block';

  // Status message
  const statusMessage = document.createElement('p');
  statusMessage.id = 'status-message';
  statusMessage.className = 'text-white mt-4';
  statusMessage.innerText = 'Waiting for authentication...';

  // Sign out button
  const signOutButton = document.createElement('button');
  signOutButton.id = 'sign-out-button';
  signOutButton.className = 'mt-6 px-6 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition';
  signOutButton.innerText = 'Sign Out';
  signOutButton.style.display = 'none';
  signOutButton.addEventListener('click', () => signOut());

  // Ajout des éléments au container
  container.appendChild(title);
  container.appendChild(gIdOnload);
  container.appendChild(gIdSignin);
  container.appendChild(statusMessage);
  container.appendChild(signOutButton);

  // Ajout du container à la page
  element.appendChild(container);

  // Ajout du script Google Identity Services (une seule fois)
  if (!document.getElementById('google-gsi-script')) {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.id = 'google-gsi-script';
    document.head.appendChild(script);
  }

  // Callback global pour Google
  (window as any).handleCredentialResponse = (response: any) => {
    console.log('[Login] handleCredentialResponse called', response);
    const jwt = response.credential;

    fetch('api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jwt })
    })
    .then(res => {
      console.log('[Login] Backend responded to /api/auth/google', res);
      if (!res.ok) {
        return res.json().then(errData => {
          throw new Error(errData.message || 'Authentication failed');
        });
      }
      return res.json();
    })
    .then(data => {
      console.log('[Login] Data received from backend:', data);
      // Stocker l'état de connexion
      localStorage.setItem('userName', data.name);
      if (data.picture) {
        localStorage.setItem('userPicture', data.picture);
      }

      statusMessage.innerHTML = '';
      if (data.picture) {
        const profileImg = document.createElement('img');
          profileImg.src = data.picture;
          profileImg.alt = "Profile picture";
          profileImg.id = "profile-picture";
          profileImg.className = 'w-32 h-32 rounded-full mx-auto block mb-8 -mt-4 shadow-lg';
          statusMessage.appendChild(profileImg);
          console.log('[Login] Profile image appended');
        } else {
          console.log('[Login] No profile image in data');
        }
        const textNode = document.createElement('span');
        textNode.textContent = ` Signed in as: ${data.name}`;
        textNode.style.marginLeft = '10px';
        statusMessage.appendChild(textNode);

        signOutButton.style.display = 'block';
        gIdSignin.style.display = 'none';
        navigateTo('/');
      })
      .catch(error => {
        statusMessage.innerText = 'Authentication failed.';
        signOutButton.style.display = 'none';
        gIdSignin.style.display = 'block';
        console.error('[Login] Erreur lors de lenvoi au backend:', error);
      });
  };

  // Vérifie l'état de connexion au chargement de la page
  function updateLoginUI() {
    const token = localStorage.getItem('token');
    if (token) {
      // Utilisateur déjà connecté
      statusMessage.innerHTML = '<span>Déjà connecté</span>';
      signOutButton.style.display = 'block';
      gIdSignin.style.display = 'none';
    } else {
      // Pas connecté
      statusMessage.innerText = 'Waiting for authentication...';
      signOutButton.style.display = 'none';
      gIdSignin.style.display = 'block';
    }
  }
  updateLoginUI();

  return element;
}

function signOut() {
  localStorage.removeItem('userName');
  localStorage.removeItem('userPicture');
  localStorage.removeItem('token'); // Supprime le token à la déconnexion

  const statusMessage = document.getElementById('status-message');
  if (statusMessage) {
    statusMessage.innerHTML = "Signed out";
  }
  const signOutButton = document.getElementById('sign-out-button');
  if (signOutButton) {
    signOutButton.style.display = 'none';
  }
  const signInButton = document.querySelector('.g_id_signin') as HTMLElement | null;
  if (signInButton) {
    signInButton.style.display = 'block';
  }
  // Supprimer la photo de profil si présente
  const profileImg = document.getElementById('profile-picture');
  if (profileImg && profileImg.parentNode) {
    profileImg.parentNode.removeChild(profileImg);
  }
  console.log("User signed out");
  navigateTo('/login');
}