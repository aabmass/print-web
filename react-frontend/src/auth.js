import ajaxFetch, { useHeader, unUseHeader } from './ajax';
import jwtDecode from 'jwt-decode';

// use local storage for the JWT token
const storage = window.localStorage;
const storageKey = 'jwt';
const headerKey = 'JWT';

function saveToken(jwtToken) {
  // first put in local storage
  storage.setItem(storageKey, jwtToken);

  // compute the token's payload for username/password
}

function getToken() {
  return storage.getItem(storageKey);
}

export let user = {
  isLoggedIn: isLoggedIn()
};

function loadUserFromJWT(jwt) {
  let { email, username } = jwtDecode(jwt);
  user = { email, username, isLoggedIn: isLoggedIn() };
}

export function isLoggedIn() {
  const token = getToken();

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
    loadUserFromJWT(json.token);

    // finally, authorize other requests with the jwt!
    useHeader(headerKey, getToken());
  });
}

export function logout() {
  localStorage.removeItem(storageKey);
  unUseHeader(headerKey);
  user = { isLoggedIn: false };
}

export function restoreAuth() {
  if (isLoggedIn()) {
    const token = getToken();

    loadUserFromJWT(token);

    // reapply the header to authorize future requests
    useHeader(headerKey, token);
  } 
}
