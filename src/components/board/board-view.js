import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import List from '../list/';
import ListForm from '../list/form/';
import './board-view.scss';

/**
 * The view for a single board.
 */
const Board = ({board, listMap, orderedLists, cardMap, orderedCards, functions}) => {

  /**
   * Context-aware class name for a list.
   *
   * @param isDragging true if the list is currently being dragged, false otherwise
   * @returns {string} the class to attach to the element
   */
  const getListClassName = isDragging => {
    return isDragging ? 'gf-list-draggable gf-list-dragging' : 'gf-list-draggable';
  };

  /**
   * Map a list to a Draggable component
   *
   * @param listId the ID of the list to transform to a draggable
   * @param index the index of the draggable
   * @returns {JSX.Element} Draggable component created from the list
   */
  const toDraggable = (listId, index) => {
    const list = listMap[listId];
    return (
        <Draggable key={list.id}
                   draggableId={'list-' + list.id}
                   index={index}
                   isDragDisabled={!list.isDraggable}>
          {(provided, snapshot) => (
              <div ref={provided.innerRef}
                   className={getListClassName(snapshot.isDragging)}
                   {...provided.draggableProps}
                   {...provided.dragHandleProps}>
                <List list={list}
                      cardMap={cardMap}
                      orderedCards={orderedCards}
                      toggleIsListDraggable={functions.toggleIsListDraggable}/>
              </div>
          )}
        </Draggable>
    );
  };

  return (
      <section className="section gf-board-view">
        <h1>{board.name}</h1>

        <DragDropContext onDragEnd={functions.onDragEnd}>
          <Droppable
              droppableId="droppable-board"
              direction="horizontal"
              type="LIST">
            {(provided, snapshot) => (
                <div ref={provided.innerRef}
                     className={snapshot.isDraggingOver
                         ? 'gf-lists-container gf-lists-container-dragging'
                         : 'gf-lists-container'}
                     {...provided.droppableProps}>
                  {
                    orderedLists.length === Object.keys(listMap).length
                        ? orderedLists.map((listId, i) => toDraggable(listId, i))
                        : ''
                  }

                  {provided.placeholder}

                  <ListForm board={board}
                            onSuccess={functions.refresh}
                            nextPriority={orderedLists.length}/>
                </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
  );

};

export default Board;

