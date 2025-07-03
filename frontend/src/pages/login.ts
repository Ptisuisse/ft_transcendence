import { getCurrentLang } from '../components/navbar.ts';
import { translations } from '../i18n.ts';
import '../style.css';

// Helper function for translation
function t(key: string): string {
  const lang = getCurrentLang();
  const langTranslations = translations[lang as keyof typeof translations] || translations.en;
  return langTranslations[key as keyof typeof langTranslations] || translations.en[key as keyof typeof translations.en] || key;
}

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
  title.innerText = t('login');

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
  statusMessage.innerText = t('WaitingForAuth');

  // Ajout des éléments au container
  container.appendChild(title);
  container.appendChild(gIdOnload);
  container.appendChild(gIdSignin);
  container.appendChild(statusMessage);

  // Ajout du container à la page
  element.appendChild(container);

  // Ajout du script Google Identity Services (une seule fois)
  function renderGoogleButton() {
    if ((window as any).google && (window as any).google.accounts && (window as any).google.accounts.id) {
      (window as any).google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (window as any).handleCredentialResponse,
        ux_mode: 'popup',
        auto_select: false,
        context: 'signin',
      });
      (window as any).google.accounts.id.renderButton(
        gIdSignin,
        {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left',
        }
      );
      gIdSignin.style.display = localStorage.getItem('token') ? 'none' : 'block';
    }
  }

  function waitForGoogleScriptAndRender() {
    if ((window as any).google && (window as any).google.accounts && (window as any).google.accounts.id) {
      renderGoogleButton();
    } else {
      setTimeout(waitForGoogleScriptAndRender, 50);
    }
  }

  if (!document.getElementById('google-gsi-script')) {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.id = 'google-gsi-script';
    script.onload = () => {
      renderGoogleButton();
    };
    document.head.appendChild(script);
    waitForGoogleScriptAndRender();
  } else {
    waitForGoogleScriptAndRender();
  }

  // Affiche toujours le bouton Google si pas connecté (même après navigation)
  setTimeout(() => {
    const token = localStorage.getItem('token');
    gIdSignin.style.display = token ? 'none' : 'block';
  }, 0);

  // Callback global pour Google
  (window as any).handleCredentialResponse = (response: any) => {
    // Force le bouton à se réafficher si besoin
    gIdSignin.style.display = 'block';
    console.log('[Login] handleCredentialResponse called', response);
    const jwt = response.credential;

    fetch('api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jwt })
    })
      .then(res => {
        console.log('[Login] Backend responded to /api/auth/google', res);
        return res.json();
      })
      .then(async data => {
        console.log('[Login] Data received from backend:', data);
        statusMessage.innerHTML = '';
        if (data && data.token && data.name && data.picture) {
          // On a bien reçu les infos, on lance la 2FA
          // On suppose que l'email est dans le JWT (décodage simple)
          let email = undefined;
          try {
            const payload = JSON.parse(atob(data.token.split('.')[1]));
            email = payload.email;
          } catch (e) {}
          if (!email) {
            statusMessage.innerText = t('EmailNotFoundInToken');
            return;
          }
          // Envoie le code 2FA
          statusMessage.innerText = t('Sending2FACode');
          await fetch('/api/auth/2fa/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });
          // Supprime le formulaire précédent s'il existe
          const oldForm = container.querySelector('form');
          if (oldForm) oldForm.remove();
          // Affiche le formulaire de saisie du code
          const codeForm = document.createElement('form');
          codeForm.className = 'flex flex-col items-center mt-4';
          const codeInput = document.createElement('input');
          codeInput.type = 'text';
          codeInput.placeholder = t('Placeholder2FACode');
          codeInput.className = 'mb-2 px-4 py-2 rounded text-black';
          const codeBtn = document.createElement('button');
          codeBtn.type = 'submit';
          codeBtn.innerText = t('Validate2FACode');
          codeBtn.className = 'px-4 py-2 bg-indigo-600 text-white rounded';
          codeForm.appendChild(codeInput);
          codeForm.appendChild(codeBtn);
          container.appendChild(codeForm);
          statusMessage.innerText = t('Sent2FACode');
          codeForm.onsubmit = async (e) => {
            e.preventDefault();
            statusMessage.innerText = t('Verifying2FACode');
            const code = codeInput.value.trim();
            if (!code) return;
            const res = await fetch('/api/auth/2fa/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, code })
            });
            const verify = await res.json();
            if (verify.ok) {
              localStorage.setItem('token', data.token);
              gIdSignin.style.display = 'none';
              window.history.pushState(null, '', '/');
              if (typeof window.renderPage === 'function') window.renderPage();
            } else {
              statusMessage.innerText = verify.message || t('Invalid2FACode');
            }
          };
        }
      })
      .catch(error => {
        statusMessage.innerText = t('AuthFailed');
        gIdSignin.style.display = 'block';
        console.error('[Login] Erreur lors de lenvoi au backend:', error);
      });
  };

  return element;
}

// Ajout pour TypeScript : déclare la fonction globale renderPage sur window
declare global {
  interface Window {
    renderPage: () => void;
  }
}