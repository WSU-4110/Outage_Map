import logo from './css/logo.svg';
import './css/App.css';
import OutageMap from './components/OutageMap';
<<<<<<< HEAD
import userLogin from './components/userLogin';

function App() { //primary page of the site
  return (
    <div className="App">     

      <header className="App-header">
        <h1>
          page is alive.
        </h1>
      </header>
      <userLogin />
      <OutageMap />
=======
import SignupForm from './components/SignupForm';
import UserLogin from './components/userLogin';
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
          <Route path="/login">
            <UserLogin />
          </Route>
        </Switch>
      </Router>
>>>>>>> 5b1b989 (adding to the newest userloginjs info 10/25)
    </div>
    
  );
}

export default App;
