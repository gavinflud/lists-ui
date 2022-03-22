import './Card.scss';
import {CardForm} from './form/CardForm';
import {useContext, useState} from 'react';
import {BoardContext} from '../board/board-context';
import {CardDateButton} from './CardDateButton';

export const useCard = (card) => {

  const {cardMap, setCardMap} = useContext(BoardContext);
  const [isCardFormVisible, setIsCardFormVisible] = useState(false);

  const toggleIsCardFormVisible = () => {
    setIsCardFormVisible(!isCardFormVisible);
  };

  const onUpdateCard = (updatedCard) => {
    let tempCard = cardMap[card.id];
    tempCard = Object.assign(tempCard, updatedCard);
    setCardMap({
      ...cardMap,
      [tempCard.id]: tempCard,
    });
  };

  return {
    isCardFormVisible,
    toggleIsCardFormVisible,
    onUpdateCard,
  };

};

export const Card = ({card}) => {

  const {isCardFormVisible, toggleIsCardFormVisible, onUpdateCard} = useCard(card);

  const CardSecondRow = ({dueDate}) => {
    if (dueDate == null) {
      return '';
    }

    return (<div className="gf-card-second-row">
      <CardDateButton date={card.dueDate}/>
    </div>);
  };

  return (
      <div className="gf-card-container">
        <div className="gf-card-first-row">
          <p className="gf-card-title">{card.title}</p>
          <button className="button is-small gf-card-edit-button" onClick={toggleIsCardFormVisible}>
          <span className="icon is-small">
            <i className="fa-solid fa-pen"/>
          </span>
          </button>
        </div>

        <CardSecondRow dueDate={card.dueDate}/>

        <CardForm isActive={isCardFormVisible}
                  onClose={toggleIsCardFormVisible}
                  onSuccess={onUpdateCard}
                  listId={card.listId}
                  card={card}/>
      </div>
  );

};