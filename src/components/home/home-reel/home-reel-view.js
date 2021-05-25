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

  const CreateForm = props.createForm;
  const reelItems = props.items.map((item) => <ReelItem key={item.link} title={item.title} link={item.link}/>);

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
            props.createForm ?
                <div className="level-right">
                  <div className="level-item">
                    <button onClick={props.toggleIsFormVisible} className="button is-success">
                  <span className="icon">
                    <i className="fas fa-plus-square"/>
                  </span>
                      <span>New</span>
                    </button>
                  </div>
                  <CreateForm isActive={props.isFormVisible}
                              onClose={props.toggleIsFormVisible}
                              onSuccess={props.onCreateSuccess}/>
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