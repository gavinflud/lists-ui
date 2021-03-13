import {withRouter} from 'react-router-dom';
import ReelItem from './reel-item-view';

/**
 * Container for an individual item in a reel.
 */
const ReelItemContainer = (props) => {

  // Show the initials as the title on the tile
  const initials = props.title.match(/\b(\w)/g)
      .join('')
      .substring(0, 2);

  /**
   * Navigate to the item on clicking the tile.
   */
  const onClick = () => {
    props.history.push(props.link);
  };

  return <ReelItem title={initials} onClick={onClick}/>;

};

export default withRouter(ReelItemContainer);