import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import logo from './css/logo.svg';
import './css/App.css';
import OutageMap from './components/OutageMap';
import SignupForm from './components/SignupForm';
import NavBar from "./components/NavBar"
import HomeContent from "./components/HomeContent"
//import { Router } from 'express';

function App() { //primary page of the site
  return (
    <div className="App">
      <Router>
        <NavBar />  
        <Switch>
          <Route exact path="/">
            <HomeContent />
          </Route>
          <Route path="/outages">
            <OutageMap />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
