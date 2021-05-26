import {Route, Switch} from 'react-router-dom';
import Home from '../home';
import Team from '../team/';
import TeamList from '../team/list/';
import BoardList from '../board/list/';
import Board from '../board/';
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
          <Route exact path="/boards">
            <BoardList/>
          </Route>
          <Route path="/boards/:id">
            <Board/>
          </Route>
        </Switch>
      </main>
  );
};

export default Content;