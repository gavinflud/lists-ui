import './app.scss'
import { BrowserRouter } from 'react-router-dom'
import Header from '../header/'

const App = (props) => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header/>
        {/*<Content/>
        <Footer/>*/}
      </BrowserRouter>
    </div>
  )
}

export default App
