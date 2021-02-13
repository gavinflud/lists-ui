/**
 * Search bar component view.
 *
 * TODO: Implement search functionality
 */
const Search = (props) => {
  return (
      <div className="gf-search control has-icons-right">
        <input className="input" type="text" placeholder="Search"/>
        <span className="icon is-right">
          <i className="fas fa-search"/>
        </span>
      </div>
  );
};

export default Search;