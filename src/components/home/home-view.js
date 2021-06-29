import HomeReel from './home-reel/';
import TeamForm from '../team/form/';
import BoardForm from '../board/form/';
import './home.scss';

/**
 * Home view for logged in users.
 */
const Home = ({pinnedBoards, boards, teams, refresh}) => {

  return (
      <div className="gf-home-page">
        <HomeReel title="Pinned Boards"
                  titleIcon="fa-thumbtack"
                  items={pinnedBoards}/>

        <HomeReel title="Teams"
                  titleIcon="fa-users"
                  createForm={TeamForm}
                  onCreateSuccess={refresh}
                  items={teams}/>

        <HomeReel title="Boards"
                  titleIcon="fa-th-list"
                  createForm={BoardForm}
                  onCreateSuccess={refresh}
                  items={boards}/>
      </div>
  );
};

export default Home;