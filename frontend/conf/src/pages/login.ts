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
      <button id="sign-out-button" style="margin-top: 20px; padding: 8px 16px; background-color: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; display: none;">Sign Out</button>
    </div>
  `;
  
  // Add event listener to sign-out button
  const signOutButton = element.querySelector('#sign-out-button') as HTMLButtonElement;
  if (signOutButton) {
    signOutButton.addEventListener('click', () => {
      // Sign out
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
    const credential = parseJwt(response.credential);
    console.log("Logged in as:", credential.name);
    
    // Récupérer l'élément conteneur de statut
    const statusMessage = document.getElementById('status-message');
    
    // Vider le message de statut existant
    if (statusMessage) {
      statusMessage.innerHTML = '';
      
      // Ajouter l'image si disponible
      if (credential.picture) {
        const profileImg = document.createElement('img');
        profileImg.src = credential.picture;
        profileImg.alt = "Profile picture";
        profileImg.id = "profile-picture";
        profileImg.className = 'w-50 h-50 rounded-full mx-auto';

        
        // Ajouter l'image au message de statut
        statusMessage.appendChild(profileImg);
      }
      
      // Ajouter le texte après l'image
      const textNode = document.createElement('span');
      textNode.textContent = ` Signed in as: ${credential.name}`;
      textNode.style.marginLeft = '10px';
      statusMessage.appendChild(textNode);
    }
    
    console.log("User signed in:", credential);
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

// Parse the JWT token from Google
function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  
  return JSON.parse(jsonPayload);
}

function signOut() {
  // Get all the Google Sign-In buttons
  const buttons = document.querySelectorAll('.g_id_signin');
  
  // Remove existing buttons
  buttons.forEach(button => button.remove());
  
  // Create a new button container
  const newButtonContainer = document.createElement('div');
  newButtonContainer.className = 'g_id_signin';
  newButtonContainer.dataset.type = 'standard';
  newButtonContainer.dataset.shape = 'rectangular';
  newButtonContainer.dataset.theme = 'outline';
  newButtonContainer.dataset.text = 'signin_with';
  newButtonContainer.dataset.size = 'large';
  newButtonContainer.dataset.logo_alignment = 'left';
  
  // Add the new button container after the g_id_onload div
  const onloadDiv = document.getElementById('g_id_onload');
  if (onloadDiv && onloadDiv.parentNode) {
    onloadDiv.parentNode.insertBefore(newButtonContainer, onloadDiv.nextSibling);
  }
  
  // Hide the sign-out button
  const signOutButton = document.getElementById('sign-out-button');
  if (signOutButton) {
    signOutButton.style.display = 'none';
  }
  
  // Update the status message
  document.getElementById('status-message')!.textContent = "Signed out";
  
  // Revoke the token (optional)
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)g_csrf_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  if (token) {
    fetch(`https://oauth2.googleapis.com/revoke?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
  
  console.log("User signed out");
}