import {Link} from 'react-router-dom';
import './home.scss';

/**
 * Home view for logged in users.
 */
const Home = (props) => {

  // Temp function to generate a board component
  const getBoard = () => {
    return (
        <div className="gf-boards-overview-item-container"/>
    );
  };

  // Temp function to generate multiple board components
  const getMultipleBoards = (num) => {
    let boards = [];
    for (let i = 0; i < num; i++) {
      boards.push(getBoard());
    }
    return boards;
  };

  return (
      <div className="gf-home-page">
        <section className="section">
          <div className="level">
            <div className="level-left">
              <span className="icon-text level-item">
                <span className="icon is-medium">
                  <i className="fas fa-history fa-lg"/>
                </span>
                <span className="title is-4 gf-title-with-icon">Recently Viewed</span>
              </span>
            </div>
          </div>

          <div className="gf-boards-overview-container">
            {getMultipleBoards(8)}
          </div>
        </section>

        <section className="section">
          <div className="level">
            <div className="level-left">
              <span className="icon-text">
                <span className="icon is-medium">
                  <i className="fas fa-users fa-lg"/>
                </span>
                <span className="title is-4 gf-title-with-icon">Teams</span>
              </span>
            </div>
            <div className="level-right">
              <div className="level-item">
                <Link to="/teams/create" className="button is-success">
                  <span className="icon">
                    <i className="fas fa-plus-square"/>
                  </span>
                  <span>New</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="gf-boards-overview-container">
            {getMultipleBoards(8)}
          </div>
        </section>

        <section className="section">
          <div className="level">
            <div className="level-left">
              <span className="icon-text">
                <span className="icon is-medium">
                  <i className="fas fa-th-list fa-lg"/>
                </span>
                <span className="title is-4 gf-title-with-icon">Boards</span>
              </span>
            </div>
            <div className="level-right">
              <div className="level-item">
                <Link to="/teams/create" className="button is-success">
                  <span className="icon">
                    <i className="fas fa-plus-square"/>
                  </span>
                  <span>New</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="gf-boards-overview-container">
            {getMultipleBoards(8)}
          </div>
        </section>
      </div>
  );
};

export default Home;