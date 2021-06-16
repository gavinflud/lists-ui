import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import List from '../list/';
import ListForm from '../list/form/';
import './board-view.scss';

/**
 * The view for a single board.
 */
const Board = (props) => {

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
   * @param list the list to map
   * @returns {JSX.Element} Draggable component created from the list
   */
  const toDraggable = list => {
    return (
        <Draggable key={list.id}
                   draggableId={'list-' + list.id}
                   index={list.priority}
                   isDragDisabled={!list.isDraggable}>
          {(provided, snapshot) => (
              <div ref={provided.innerRef}
                   className={getListClassName(snapshot.isDragging)}
                   {...provided.draggableProps}
                   {...provided.dragHandleProps}>
                <List list={list}
                      toggleIsListDraggable={props.toggleIsListDraggable}/>
              </div>
          )}
        </Draggable>
    );
  };

  return (
      <section className="section gf-board-view">
        <h1>{props.board.name}</h1>

        <DragDropContext onDragEnd={props.onDragEnd}>
          <Droppable droppableId="droppable-board" direction="horizontal">
            {(provided, snapshot) => (
                <div ref={provided.innerRef}
                     className={snapshot.isDraggingOver
                         ? 'gf-lists-container gf-lists-container-dragging'
                         : 'gf-lists-container'}
                     {...provided.droppableProps}>
                  {props.lists.map(list => toDraggable(list))}

                  {provided.placeholder}

                  <div className="gf-list-draggable gf-list-container-button">
                    <button onClick={props.toggleIsListFormVisible}>New List</button>
                  </div>
                </div>
            )}
          </Droppable>
        </DragDropContext>

        <ListForm isActive={props.isListFormVisible}
                  onClose={props.toggleIsListFormVisible}
                  onSuccess={props.refresh}
                  board={props.board}
                  nextPriority={props.lists.length}/>
      </section>
  );

};

export default Board;

