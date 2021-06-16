import './card-view.scss';

/**
 * The view for a single card.
 */
const Card = ({card}) => {

  return (
      <div className="gf-card-container">
        <p>{card.title}</p>
      </div>
  );

};

export default Card;