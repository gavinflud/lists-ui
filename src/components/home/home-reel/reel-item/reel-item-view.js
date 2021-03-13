import './reel-item.scss';

/**
 * An individual item in a reel. Would typically show a preview of the item that can be visited by clicking.
 */
const ReelItem = (props) => {

  return (
      <div className="gf-boards-overview-item-container" onClick={props.onClick}>
        <span className="gf-reel-item-title">{props.title}</span>
      </div>
  );
};

export default ReelItem;