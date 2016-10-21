let attachHeaders = {
  // some defaults
};

/**
 * Use this to add a default header to be inserted on each request from now
 * on. E.g. to authorize requests with a token.
 */
export function useHeader(headerKey, value) {
  attachHeaders[headerKey] = value;
}

export function unUseHeader(headerKey) {
  delete attachHeaders[headerKey];
}

/**
 * Call this function in specific overriding calls such as ajaxFetch() below
 * does. This function also wraps an error handler to cause the promise to
 * reject if the status is not "ok".
 */
function fetchInjectHeaders(endpoint, init = {}) {
  let headers = init.headers || {};

  // add in the default properties not already assigned
  Object.keys(attachHeaders).forEach((key, index) => {
    headers[key] = headers[key] || attachHeaders[key];
  });

  init.headers = headers;

  return fetch(endpoint, init).then((response) => {
    // reject if status isn't ok for all fetch's. This is not fetch's default
    // behavior, but it will now behave that way to users of this function
    if (!response.ok) {
      let err = Error(response.statusText);
      err.response = response;
      throw err;
    }

    return response;
  });
}

/**
 * This just wraps fetch (we are using the polyfill) in order to insert
 * default headers for JSON."ok".
 */
export default function ajaxFetch(endpoint, init = {}) {
  let headers = init.headers || {};
  headers['Content-Type'] = 'application/json';
  init.headers = headers;

  return fetchInjectHeaders(endpoint, init);
};

export function multipartFetch(endpoint, init = {}) {
  let headers = init.headers || {};

  // for multipart, need to remove content type header
  delete headers['Content-Type'];
  init.headers = headers;

  return fetchInjectHeaders(endpoint, init);
}

