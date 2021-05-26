import {RequestType, sendRequest} from '../http';

/**
 * Service to define common API calls that can be reused across components.
 *
 * TODO: Handle errors
 */
const Api = {

  /**
   * Get the teams the current user is a member of.
   *
   * @param user the current user
   * @returns {Promise<Array>} an array of teams
   */
  getTeamsForCurrentUser: (user) => {
    return new Promise(resolve => {
      sendRequest(RequestType.GET, '/teams', {userId: user.id}, null, true)
          .then((response) => resolve(response.data.body.content));
    });
  },

  /**
   * Get the boards the current user has access to.
   *
   * @param user the current user
   * @returns {Promise<Array>} an array of boards
   */
  getBoardsForCurrentUser: (user) => {
    return new Promise(resolve => {
      sendRequest(RequestType.GET, '/boards', {userId: user.id}, null, true)
          .then((response) => resolve(response.data.body.content));
    });
  },

};

export default Api;