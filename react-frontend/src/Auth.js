// any imports may go here

// use local storage for the JWT token
const storage = window.localStorage;
const storageKey = 'jwt';

function saveToken(jwtToken) {
  // first put in local storage
  console.log(jwtToken);
  storage.setItem(storageKey, jwtToken);

  // compute the token's payload for username/password
}

export function isLoggedIn() {
  const token = storage.getItem(storageKey);

  // If there is a token in the storage, we are logged in.
  // Note, this doesn't mean it isn't expired or invalid!
  return token !== null;
}

export function login(username, password) {
  return fetch('/api/auth/login', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(response => response.json()).then(json => {
    saveToken(json.token);
  });
}
