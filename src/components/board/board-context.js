import {createContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {RequestType, sendRequest} from '../../utils/http';

/**
 * Stores the global board context.
 */
export const BoardContext = createContext({});

/**
 * Provides the global board context to all descendents of this provider that consume it.
 *
 * @param children any child components
 */
export const BoardProvider = ({children}) => {

  const {id} = useParams();
  const [cardMap, setCardMap] = useState({});
  const [orderedCards, setOrderedCards] = useState({});

  /**
   * Handle when a change was made to orderedCards, as this means the priority for the matching card in cardMap needs
   * to be updated. Also updates cards on server side if they have been modified on client side.
   */
  useEffect(() => {
    const cardsToUpdate = [];
    const flattenedOrderedCards = Object.values(orderedCards)
        .flat();

    if (flattenedOrderedCards.length > 0 && flattenedOrderedCards.length === Object.keys(cardMap).length) {
      Object.keys(orderedCards)
          .forEach((listId) => {
            const id = parseInt(listId);
            orderedCards[id].forEach((cardId, i) => {
              const card = cardMap[cardId];

              if (card.listId !== id || card.priority !== i) {
                card.priority = i;
                card.listId = id;
                cardsToUpdate.push(card);
              }
            });
          });
    }

    if (cardsToUpdate.length > 0) {
      sendRequest(RequestType.PUT, '/cards', null, {cards: cardsToUpdate}, true);

      setCardMap({
        ...cardMap,
        ...cardsToUpdate.reduce((map, card) => ({
          ...map,
          [card.id]: card,
        }), {}),
      });
    }
  }, [orderedCards, cardMap, setCardMap]);

  /**
   * Handle when a card was added or removed from cardMap, as orderedCards has to be synced.
   */
  useEffect(() => {
    const cardMapIds = Object.keys(cardMap)
        .map(id => parseInt(id));
    const orderedCardsIds = Object.values(orderedCards)
        .flat();

    if (orderedCardsIds.length !== 0 && cardMapIds.length > orderedCardsIds.length) {
      const addedCardIds = cardMapIds.filter(id => !orderedCardsIds.includes(id));
      const tempOrderedCards = {...orderedCards};

      addedCardIds.forEach(id => {
        const listId = cardMap[id].listId;
        const tempCardArray = [...tempOrderedCards[listId]];
        tempCardArray.push(id);
        tempOrderedCards[listId] = tempCardArray;
      });

      setOrderedCards(tempOrderedCards);
    }
  }, [cardMap, orderedCards, setOrderedCards]);

  const value = {cardMap, setCardMap, orderedCards, setOrderedCards, id};

  return (
      <BoardContext.Provider value={value}>
        {children}
      </BoardContext.Provider>
  );
};