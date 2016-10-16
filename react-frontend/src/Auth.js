// any imports may go here

export function login(username, password) {
  fetch('/api/login', {
    method: "POST",
    body: { username, password }
  }).then(response => response.json()).then(json => {
    console.log(json);
  });
}
