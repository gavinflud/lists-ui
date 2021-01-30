import './app.scss';
import {BrowserRouter} from 'react-router-dom';
import Header from '../header/';

/**
 * The root application view.
 */
const App = (props) => {
  return (
      <div className="app">
        <BrowserRouter>
          <Header user={props.user} functions={props.functions}/>
          {/*<Content/>
        <Footer/>*/}
        </BrowserRouter>
      </div>
  );
};

export default App;
