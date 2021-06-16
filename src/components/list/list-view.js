import './list-view.scss';
import CardForm from '../card/form/';
import Card from '../card/';

/**
 * The view for a single list.
 */
const List = (props) => {

  const list = props.list;
  const cards = props.cards;

  return (
      <div key={list.id} className="gf-list-container">
        <div className="gf-list-container-header">
          <h3 className="gf-list-container-title">{list.name}</h3>
          <button className="button is-small" onClick={props.toggleIsCardFormVisible}>
            <span className="icon is-small">
              <i className="fas fa-plus"/>
            </span>
          </button>
        </div>

        <div className="gf-list-cards">
          {cards.map(card => <Card card={card} key={card.id}/>)}
        </div>

        <CardForm isActive={props.isCardFormVisible}
                  onClose={props.toggleIsCardFormVisible}
                  onSuccess={props.refresh}
                  list={props.list}
                  nextPriority={cards.length}/>
      </div>
  );

};

export default List;