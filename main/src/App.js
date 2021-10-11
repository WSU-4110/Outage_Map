import logo from './css/logo.svg';
import './css/App.css';
import OutageMap from './components/OutageMap';
import NavBar from "./components/NavBar"
import HomeContent from "./components/HomeContent"

function App() { //primary page of the site
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>
          page is alive.
        </h1>
      </header>
      <OutageMap />
    </div>
    
  );
}

export default App;
