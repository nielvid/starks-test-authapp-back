import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';

import HomePage from './components/HomePage';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';

export const MyContext = React.createContext()

function App() {

  
  return (
    <>

    <BrowserRouter>
      
  <Navbar />
 <Switch>
      <Route exact path="/">
      <MyContext.Provider value={{ username: "ayosco001", email: 'ayosco001@gmail.com', password: 123456, telephone:"07076597056" }}>
      <Register />
 </MyContext.Provider>
    </Route>

    <Route exact path="/login">
  <Login />
    </Route>

     <Route exact path="/home">
  <HomePage />
    </Route>
</Switch>
     </BrowserRouter>
    

  </>
    
  );
}

export default App;
