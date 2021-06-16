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
   * TODO: Doesn't handle paging
   *
   * @param user the current user
   * @returns {Promise<Array>} an array of teams
   */
  getTeamsForCurrentUser: user => {
    return new Promise(resolve => {
      sendRequest(RequestType.GET, '/teams', {userId: user.id}, null, true)
          .then((response) => resolve(response.data.body.content));
    });
  },

  /**
   * Get the boards the current user has access to.
   *
   * TODO: Doesn't handle paging
   *
   * @param user the current user
   * @returns {Promise<Array>} an array of boards
   */
  getBoardsForCurrentUser: user => {
    return new Promise(resolve => {
      sendRequest(RequestType.GET, '/boards', {userId: user.id}, null, true)
          .then((response) => resolve(response.data.body.content));
    });
  },

  /**
   * Get the lists for a specific board.
   *
   * @param boardId identifies the board
   * @returns {Promise<Array>} an array of lists
   */
  getListsForBoard: boardId => {
    return new Promise(resolve => {
      sendRequest(RequestType.GET, '/lists', {boardId: boardId}, null, true)
          .then(response => resolve(response.data.body));
    });
  },

  /**
   * Get the cards for a specific list.
   *
   * @param listId identifies the list
   * @returns {Promise<Array>} an array of cards
   */
  getCardsForList: listId => {
    return new Promise(resolve => {
      sendRequest(RequestType.GET, '/cards', {listId: listId}, null, true)
          .then(response => resolve(response.data.body));
    });
  },

};

export default Api;