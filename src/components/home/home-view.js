import './home.scss';

/**
 * Home view for logged in users.
 */
const Home = (props) => {
  return (
      <div>
        <section className="section">
          <span className="icon-text">
            <span className="icon is-large">
              <i className="fas fa-history fa-2x"/>
            </span>
            <span className="title gf-title-with-icon">Recently Viewed</span>
          </span>

        </section>

        <section className="section">
          <span className="icon-text">
            <span className="icon is-large">
              <i className="fas fa-users fa-2x"/>
            </span>
            <span className="title gf-title-with-icon">Teams</span>
          </span>

        </section>

        <section className="section">
          <span className="icon-text">
            <span className="icon is-large">
              <i className="fas fa-th-list fa-2x"/>
            </span>
            <span className="title gf-title-with-icon">Boards</span>
          </span>

        </section>
      </div>
  );
};

export default Home;