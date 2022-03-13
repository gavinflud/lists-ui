import {useNavigate} from 'react-router-dom';
import ReelItem from './reel-item-view';

/**
 * Container for an individual item in a reel.
 */
const ReelItemContainer = (props) => {

  const navigate = useNavigate();

  /**
   * Navigate to the item on clicking the tile.
   */
  const onClick = () => {
    navigate(props.link);
  };

  return <ReelItem title={props.title} onClick={onClick}/>;

};

export default ReelItemContainer;