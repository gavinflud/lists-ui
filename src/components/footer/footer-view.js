/**
 * The footer view.
 */
const Footer = () => {
  const version = process.env.REACT_APP_VERSION;

  return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p className="has-text-grey-light">v{version} - Built by <a className="has-text-grey-light"
                                                                      href="https://gavinflood.com">Gavin
            Flood</a></p>
        </div>
      </footer>
  );
};

export default Footer;