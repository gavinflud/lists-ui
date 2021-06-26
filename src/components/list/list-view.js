import './list-view.scss';
import CardForm from '../card/form/';
import Card from '../card/';
import {Draggable, Droppable} from 'react-beautiful-dnd';

/**
 * The view for a single list.
 */
const List = ({list, cardMap, orderedCards, isCardFormVisible, toggleIsCardFormVisible, refresh}) => {

  const orderedCardsForThisList = orderedCards[list.id] ? orderedCards[list.id] : [];

  /**
   * Context-aware class name for a card.
   *
   * @param isDragging true if the card is currently being dragged, false otherwise
   * @returns {string} the class to attach to the element
   */
  const getCardClassName = isDragging => {
    return isDragging ? 'gf-card-draggable gf-card-dragging' : 'gf-card-draggable';
  };

  /**
   * Map a card to a Draggable component
   *
   * @param card the card to map
   * @param index the index of the draggable
   * @returns {JSX.Element} Draggable component created from the card
   */
  const toDraggable = (card, index) => {
    return (
        <Draggable key={card.id}
                   draggableId={'card-' + card.id}
                   index={index}
                   isDragDisabled={!card.isDraggable}>
          {(provided, snapshot) => (
              <div ref={provided.innerRef}
                   className={getCardClassName(snapshot.isDragging)}
                   {...provided.draggableProps}
                   {...provided.dragHandleProps}>
                <Card card={card}/>
              </div>
          )}
        </Draggable>
    );
  };

  return (
      <div key={list.id} className="gf-list-container">
        <div className="gf-list-container-header">
          <h3 className="gf-list-container-title">{list.name}</h3>
          <button className="button is-small" onClick={toggleIsCardFormVisible}>
            <span className="icon is-small">
              <i className="fas fa-plus"/>
            </span>
          </button>
        </div>

        <Droppable
            droppableId={'droppable-list-' + list.id}
            type="CARD">
          {(provided, snapshot) => (
              <div
                  ref={provided.innerRef}
                  className="gf-list-cards"
                  {...provided.droppableProps}>

                {
                  Object.values(orderedCards)
                      .flat().length === Object.keys(cardMap).length
                      ? orderedCardsForThisList.map((cardId, i) => toDraggable(cardMap[cardId], i))
                      : ''
                }

                {provided.placeholder}
              </div>
          )}
        </Droppable>

        <CardForm isActive={isCardFormVisible}
                  onClose={toggleIsCardFormVisible}
                  onSuccess={refresh}
                  list={list}
                  nextPriority={orderedCardsForThisList.length}/>
      </div>
  );

};

export default List;