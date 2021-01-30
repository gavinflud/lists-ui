import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;

/**
 * The available HTTP request types.
 */
export const RequestType = {
  GET: 'get',
  PUT: 'put',
  PATCH: 'patch',
  POST: 'post',
  DELETE: 'delete',
};

/**
 * Sends a request to the server.
 *
 * @param {String} type The HTTP request type
 * @param {String} path The path to append to the URL
 * @param {Object} params The request parameters (optional)
 * @param {Object} body The request body (optional)
 * @param {boolean} withCredentials True if sending credentials
 */
export const sendRequest = (type, path, params, body, withCredentials) => {
  const request = {
    method: type,
    url: URL + path,
  };

  if (params) {
    request['params'] = params;
  }

  if (body) {
    request['data'] = body;
  }

  if (withCredentials) {
    request['withCredentials'] = true;
  }

  return axios(request);
};