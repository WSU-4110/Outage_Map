import SignupForm from './components/SignupForm'
import React from 'react'
class App extends React.Component {
  render() {
  return (
    <div className="App">
      <main id = "main-holder">

      <h1 id = "login-error-msg-holder"> Registration form </h1 >
      <SignupForm />
      </main>
    </div>
  );
  }
}

export default App;
