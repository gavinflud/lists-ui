import Card from './card-view';

/**
 * Container for the card component.
 */
const CardContainer = ({card}) => {

  return <Card card={card} key={card.id}/>;

};

export default CardContainer;