import {withRouter} from 'react-router-dom';
import ReelItem from './reel-item-view';

/**
 * Container for an individual item in a reel.
 */
const ReelItemContainer = (props) => {

  /**
   * Navigate to the item on clicking the tile.
   */
  const onClick = () => {
    props.history.push(props.link);
  };

  return <ReelItem title={props.title} onClick={onClick}/>;

};

export default withRouter(ReelItemContainer);