import './style.css'

// Add a meta tag for the Google client ID
const meta = document.createElement('meta');
meta.name = 'google-signin-client_id';
meta.content = 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com'; // Replace with your actual client ID
document.head.appendChild(meta);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="my-signin2"></div>
`;

function onSuccess(googleUser: any) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}

function onFailure(error: any) {
  console.error(error);
}

function renderButton() {
  (window as any).gapi.signin2.render('my-signin2', {
    scope: 'profile email',
    width: 240,
    height: 50,
    longtitle: true,
    theme: 'dark',
    onsuccess: onSuccess,
    onfailure: onFailure,
    client_id: 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com' // Add this line
  });
}

const script = document.createElement('script');
script.src = 'https://apis.google.com/js/platform.js';
script.async = true;
script.defer = true;
script.onload = () => {
  renderButton();
};
document.head.appendChild(script);
// 