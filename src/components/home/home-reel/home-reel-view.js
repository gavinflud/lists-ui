import {Link} from 'react-router-dom';
import ReelItem from './reel-item';
import './home-reel.scss';

/**
 * A reel is a horizontal set of preview image links in the style of a film reel (somewhat). It takes the following
 * properties:
 *  - (title) title of the reel
 *  - (titleIcon) the title icon identifier
 *  - (createLink) the link to where a new entry for this reel can be created
 */
const HomeReel = (props) => {

  const reelItems = props.items.map((item) => <ReelItem title={item.title} link={item.link}/>);

  return (
      <section className="section gf-home-reel">
        <div className="level">
          <div className="level-left">
              <span className="icon-text">
                <span className="icon is-medium">
                  <i className={'fas fa-lg ' + props.titleIcon}/>
                </span>
                <span className="title is-4 gf-title-with-icon">{props.title}</span>
              </span>
          </div>
          {
            props.createLink ?
                <div className="level-right">
                  <div className="level-item">
                    <Link to={props.createLink} className="button is-success">
                  <span className="icon">
                    <i className="fas fa-plus-square"/>
                  </span>
                      <span>New</span>
                    </Link>
                  </div>
                </div> :
                ''
          }

        </div>

        <div className="gf-boards-overview-container">
          {reelItems}
        </div>
      </section>
  );

};

export default HomeReel;