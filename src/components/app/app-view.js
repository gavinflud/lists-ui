import './app.scss';
import {BrowserRouter} from 'react-router-dom';
import Header from '../header/';
import Footer from '../footer/';
import Content from '../content';

/**
 * The root application view.
 */
const App = (props) => {
  return (
      <div className="gf-app">
        <BrowserRouter>
          <Header/>
          <Content/>
          <Footer/>
        </BrowserRouter>
      </div>
  );
};

export default App;
