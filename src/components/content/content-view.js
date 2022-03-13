import {Route, Routes} from 'react-router-dom';
import Home from '../home';
import TeamList from '../team/list/';
import BoardList from '../board/list/';
import Board from '../board/';
import './content.scss';
import {BoardProvider} from '../board/board-context';
import Team from '../team/team-container';

/**
 * Application routing is defined here.
 */
const Content = (props) => {
  return (
      <main className="gf-main">
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="teams" element={<TeamList/>}/>
          <Route path="teams/:id" element={<Team/>}/>
          <Route path="boards" element={<BoardList/>}/>
          <Route path="boards/:id" element={
            <BoardProvider>
              <Board/>
            </BoardProvider>
          }/>
        </Routes>
      </main>
  );
};

export default Content;