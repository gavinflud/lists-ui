import {Route, Switch} from 'react-router-dom';
import Home from '../home';
import TeamForm from '../team/form';
import './content.scss';

/**
 * Application routing is defined here.
 */
const Content = (props) => {
  return (
      <main className="gf-main">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/teams/create">
            <TeamForm/>
          </Route>
        </Switch>
      </main>
  );
};

export default Content;