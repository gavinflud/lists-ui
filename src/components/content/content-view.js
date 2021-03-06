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
            <Home user={props.user}/>
          </Route>
          <Route path="/teams/create">
            <TeamForm user={props.user}/>
          </Route>
        </Switch>
      </main>
  );
};

export default Content;