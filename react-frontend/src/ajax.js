let attachHeaders = {
  // some defaults
  'Content-Type': 'application/json'
};

/**
 * Use this to add a default header to be inserted on each request from now
 * on. E.g. to authorize requests with a token.
 */
export function useHeader(headerKey, value) {
  attachHeaders[headerKey] = value;
}

/**
 * This just wraps fetch (we are using the polyfill) in order to insert default
 * headers. For instance, specifiying json content and authorizing requests
 * with the auth headers
 */
export default function ajaxFetch(endpoint, init) {
  let headers = init.headers || {};

  // add in the default properties not already assigned
  Object.keys(attachHeaders).forEach((key, index) => {
    headers[key] = headers[key] || attachHeaders[key];
  });

  init.headers = headers;

  return fetch(endpoint, init);
};
