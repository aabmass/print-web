import ajaxFetch, { useHeader } from './ajax';

// use local storage for the JWT token
const storage = window.localStorage;
const storageKey = 'jwt';

function saveToken(jwtToken) {
  // first put in local storage
  storage.setItem(storageKey, jwtToken);

  // compute the token's payload for username/password
}

export let user = {

};

export function isLoggedIn() {
  const token = storage.getItem(storageKey);

  // If there is a token in the storage, we are logged in.
  // Note, this doesn't mean it isn't expired or invalid!
  return token !== "undefined" && token !== undefined &&
         token !== "null" && token !== null;
}

export function login(username, password) {
  return ajaxFetch('/api/auth/login', {
    method: "POST",
    body: JSON.stringify({ username, password })
  }).then(response => response.json()).then(json => {
    saveToken(json.token);
  });
}

export function logout() {
  localStorage.removeItem(storageKey);
}
