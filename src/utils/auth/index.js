import jwt from 'jsonwebtoken';
import axios from 'axios';
import {RequestType, sendRequest} from '../http';

/**
 * Intercept requests to pass the user's access token in the headers to authenticate them on the server.
 */
axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem(auth.ACCESS_TOKEN);
      if (accessToken) {
        config.headers['Authorization'] = 'Bearer ' + accessToken;
      }

      return config;
    },
    Promise.reject,
);

/**
 * Intercept responses from the server with the 401 Unauthorized HTTP code. In this case, the access token is invalid
 * which is most likely because it has expired. A request should be sent to the server with the refresh token to try
 * and get a new access token. If the token is refreshed successfully, then re-send the original request.
 */
axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;
      const isOriginalRequestRefresh = originalRequest.url.endsWith(auth.REFRESH_ENDPOINT);
      const refreshToken = localStorage.getItem(auth.REFRESH_TOKEN);

      if (!isOriginalRequestRefresh && refreshToken && error.response.status === 401) {
        sendRequest(RequestType.POST, auth.REFRESH_ENDPOINT, null, {
          refreshToken: refreshToken,
        }, false)
            .then((response) => {
              // Store the refreshed tokens and then re-send the original request
              auth.setTokens(response.data.accessToken, response.data.refreshToken);
              return axios(originalRequest);
            })
            .catch((error) => {
              auth.deleteTokens();
              return Promise.reject(error);
            });
      }

      return Promise.reject(error);
    },
);

/**
 * Authentication utility for handling JWT authentication and refreshing.
 */
const auth = {

  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',

  AUTH_ENDPOINT: '/authenticate',
  REFRESH_ENDPOINT: '/authenticate/refresh',

  /**
   * Authenticate a set of credentials and if successful, store the tokens returned from the server.
   *
   * @param username identifies the user
   * @param password the user's password
   * @returns {Promise<Object>} a promise resolving with the access token if successful, otherwise with the error
   */
  authenticate: (username, password) => {
    return sendRequest(RequestType.POST, auth.AUTH_ENDPOINT, null, {
      username: username,
      password: password,
    }, false)
        .then((response) => {
          auth.setTokens(response.data.accessToken, response.data.refreshToken);
          return Promise.resolve(response.data.accessToken);
        })
        .catch((error) => Promise.reject(error));
  },

  /**
   * Refresh the access token by sending the refresh token to the server.
   *
   * @param refreshToken used to refresh the access token assuming the refresh token is valid
   * @returns {Promise<Object>} a promise resolving with the access token if successful, otherwise with the error
   */
  refresh: (refreshToken) => {
    return sendRequest(RequestType.POST, auth.REFRESH_ENDPOINT, null, {
      refreshToken: refreshToken,
    }, false)
        .then((response) => {
          auth.setTokens(response.data.accessToken, response.data.refreshToken);
          return Promise.resolve(response.data.accessToken);
        })
        .catch((error) => {
          auth.deleteTokens();
          return Promise.reject(error);
        });
  },

  /**
   * Decode a JSON web token.
   *
   * @param {String} token to be decoded
   * @returns {Promise<Object>} promise that resolves to return the decoded token
   */
  decode: (token) => {
    return Promise.resolve(jwt.decode(token));
  },

  /**
   * Delete access and refresh tokens from local storage.
   */
  deleteTokens: () => {
    localStorage.removeItem(auth.REFRESH_TOKEN);
    localStorage.removeItem(auth.ACCESS_TOKEN);
  },

  /**
   * Store the access and refresh tokens in local storage.
   *
   * @param accessToken the encoded access token
   * @param refreshToken the encoded refresh token
   */
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem(auth.ACCESS_TOKEN, accessToken);
    localStorage.setItem(auth.REFRESH_TOKEN, refreshToken);
  },

};

export default auth;