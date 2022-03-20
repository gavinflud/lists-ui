import './Card.scss';
import {CardForm} from './form/CardForm';
import {useContext, useState} from 'react';
import {BoardContext} from '../board/board-context';

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
    cardWrapper: card,
    listId: card.listId,
    isCardFormVisible,
    toggleIsCardFormVisible,
    onUpdateCard,
  };

};

export const Card = ({card}) => {

  const {
    cardWrapper,
    listId,
    isCardFormVisible,
    toggleIsCardFormVisible,
    onUpdateCard,
  } = useCard(card);
  const {title} = cardWrapper;

  return (
      <div className="gf-card-container">
        <p className="gf-card-title">{title}</p>
        <button className="button is-small gf-card-edit-button" onClick={toggleIsCardFormVisible}>
          <span className="icon is-small">
          <i className="fa-solid fa-pen"/>
        </span>
        </button>

        <CardForm isActive={isCardFormVisible}
                  onClose={toggleIsCardFormVisible}
                  onSuccess={onUpdateCard}
                  listId={listId}
                  card={cardWrapper}/>
      </div>
  );

};