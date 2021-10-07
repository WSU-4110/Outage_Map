import logo from './css/logo.svg';
import './css/App.css';
import OutageMap from './components/OutageMap';

function App() { //primary page of the site
  return (
    <div className="App">
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
