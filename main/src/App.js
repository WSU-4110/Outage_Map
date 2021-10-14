import logo from './css/logo.svg';
import './css/App.css';
import {Switch, Route} from 'react-router-dom'
import Login from './components/userLogin';
import OutageMap from './components/OutageMap';

function App() { //primary page of the site
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          page is alive.
        </h1>
      </header>
      <Switch>
        <Route exact path='/' component={Login}/>
        </Switch>

      <OutageMap />
    </div>
    
  );
}

export default App;
