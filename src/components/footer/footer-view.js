/**
 * The footer view.
 */
const Footer = () => {
  const version = process.env.REACT_APP_VERSION;

  return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p className="has-text-grey-light">Version {version} - Developed by <a className="has-text-grey-light"
                                                                                 href="https://gavinflood.com">Gavin
            Flood</a></p>
        </div>
      </footer>
  );
};

export default Footer;