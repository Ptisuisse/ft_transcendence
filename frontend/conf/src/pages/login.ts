import '../style.css';

export function LoginPage(): HTMLElement {
  const element = document.createElement('div');
  
  // Set up client ID as a variable for reuse
  const CLIENT_ID = '466591943367-vfpoq4upenktcjdtb0kv0hd7mc8bidrt.apps.googleusercontent.com';
  
  element.innerHTML = `
    <div class="login-container">
      <h2>Login</h2>
      <div id="g_id_onload"
         data-client_id="${CLIENT_ID}"
         data-context="signin"
         data-ux_mode="popup"
         data-callback="handleCredentialResponse"
         data-auto_prompt="false">
      </div>

      <div class="g_id_signin"
         data-type="standard"
         data-shape="rectangular"
         data-theme="outline"
         data-text="signin_with"
         data-size="large"
         data-logo_alignment="left">
      </div>
      
      <p id="status-message" style="color: white; margin-top: 10px;">Waiting for authentication...</p>
      <button id="sign-out-button" style="margin-top: 20px; padding: 8px 16px; background-color: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; display: none; ">Sign Out</button>
    </div>
  `;
  
  // Add event listener to sign-out button
  const signOutButton = element.querySelector('#sign-out-button') as HTMLButtonElement;
  if (signOutButton) {
    signOutButton.addEventListener('click', () => {
      signOut();
    });
  }
  
  // Add the Google Identity Services script
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
  
  // Define the callback function for credential response in the global scope
// Define the callback function for credential response in the global scope
  (window as any).handleCredentialResponse = (response: any) => {
    const jwt = response.credential;

    fetch('api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ jwt })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Réponse backend:', data);
      const statusMessage = document.getElementById('status-message');
      if (statusMessage) {
        statusMessage.innerHTML = '';
        // Ajouter l'image si disponible
        if (data.picture) {
          const profileImg = document.createElement('img');
          profileImg.src = data.picture;
          profileImg.alt = "Profile picture";
          profileImg.id = "profile-picture";
          profileImg.className = 'w-32 h-32 rounded-full mx-auto block mb-8 -mt-4 shadow-lg'; // Taille + marge + ombre
          // Ajouter l'image au message de statut
          statusMessage.appendChild(profileImg);
        }
        // Ajouter le texte après l'image
        const textNode = document.createElement('span');
        textNode.textContent = ` Signed in as: ${data.name}`;
        textNode.style.marginLeft = '10px';
        statusMessage.appendChild(textNode);
      }
      // Show the sign-out button
      const signOutButton = document.getElementById('sign-out-button');
      if (signOutButton) {
        signOutButton.style.display = 'block';
      }
      // Hide the sign-in button
      const signInButton = document.querySelector('.g_id_signin');
      if (signInButton) {
        (signInButton as HTMLElement).style.display = 'none';
      }

    })
    .catch(error => {
      console.error('Erreur lors de lenvoi au backend:', error);
    });

    const signInButton = document.querySelector('.g_id_signin');
    if (signInButton) {
      (signInButton as HTMLElement).style.display = 'none';
    }
    
    // Show the sign-out button
    const signOutButton = document.getElementById('sign-out-button');
    if (signOutButton) {
      signOutButton.style.display = 'block';
    }
  };
  
  return element;
}


function signOut() {
  // 1. Supprimer l'image de profil et le message
  const statusMessage = document.getElementById('status-message');
  if (statusMessage) {
    statusMessage.innerHTML = "Signed out";
  }

  // 2. Cacher le bouton "Sign Out"
  const signOutButton = document.getElementById('sign-out-button');
  if (signOutButton) {
    signOutButton.style.display = 'none';
  }

  // 3. Réafficher le bouton "Sign In"
  let signInButton = document.querySelector('.g_id_signin');
  if (!signInButton) {
    // Si le bouton a été supprimé, on le recrée
    signInButton = document.createElement('div');
    signInButton.className = 'g_id_signin';
    signInButton.setAttribute('data-type', 'standard');
    signInButton.setAttribute('data-shape', 'rectangular');
    signInButton.setAttribute('data-theme', 'outline');
    signInButton.setAttribute('data-text', 'signin_with');
    signInButton.setAttribute('data-size', 'large');
    signInButton.setAttribute('data-logo_alignment', 'left');
    // On le place après le g_id_onload
    const onloadDiv = document.getElementById('g_id_onload');
    if (onloadDiv && onloadDiv.parentNode) {
      onloadDiv.parentNode.insertBefore(signInButton, onloadDiv.nextSibling);
    }
    // Google Identity Services va automatiquement retransformer ce div en bouton
  } else {
    (signInButton as HTMLElement).style.display = 'block';
  }

  // 4. (Optionnel) Révoquer le token Google côté client
  // (Tu peux garder ce code si tu veux vraiment révoquer le token)

  console.log("User signed out");
}