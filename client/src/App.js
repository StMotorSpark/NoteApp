import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./libs/components/login";
import Logout from './libs/components/logout';
import useLogin, { LoginContext } from './libs/hooks/loginHook';
import ViewNotes from './libs/components/viewNotes';

function App() {
  const loginState = useLogin();

  let content = null;
  if (loginState.loginState !== null) {
    content = <ViewNotes />
  }

  return (
    <LoginContext.Provider value={loginState}>
      <div className="App">
        <Login></Login>
        <Logout></Logout>

        {content}
      </div>
    </LoginContext.Provider>
  );
}

export default App;
