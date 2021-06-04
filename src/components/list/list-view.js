import './list-view.scss';

/**
 * The view for a single list.
 */
const List = (props) => {

  const list = props.list;

  return (
      <div key={list.id} className="gf-list-container">
        <h3>{list.name}</h3>
      </div>
  );

};

export default List;