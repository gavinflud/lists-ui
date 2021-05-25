import {Route, Switch} from 'react-router-dom';
import Home from '../home';
import Team from '../team/';
import TeamList from '../team/list/';
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
          <Route exact path="/teams">
            <TeamList/>
          </Route>
          <Route path="/teams/:id">
            <Team/>
          </Route>
        </Switch>
      </main>
  );
};

export default Content;