import HomeReel from './home-reel/';
import TeamForm from '../team/form/';
import './home.scss';

/**
 * Home view for logged in users.
 */
const Home = (props) => {

  return (
      <div className="gf-home-page">
        <HomeReel title="Recently Viewed"
                  titleIcon="fa-history"
                  items={props.recentBoards}/>

        <HomeReel title="Teams"
                  titleIcon="fa-users"
                  createForm={TeamForm}
                  onCreateSuccess={props.refresh}
                  items={props.teams}/>

        <HomeReel title="Boards"
                  titleIcon="fa-th-list"
                  createLink="/boards/create"
                  items={props.boards}/>
      </div>
  );
};

export default Home;