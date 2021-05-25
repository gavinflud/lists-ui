import HomeReel from './home-reel-view';
import {useState} from 'react';

const HomeReelContainer = (props) => {

  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const toggleIsFormVisible = () => {
    setIsFormVisible(!isFormVisible);
  };

  return <HomeReel {...props} isFormVisible={isFormVisible} toggleIsFormVisible={toggleIsFormVisible}/>;

};

export default HomeReelContainer;