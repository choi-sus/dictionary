import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Add from './Add';
import Update from './Update';
import { useDispatch } from "react-redux";
import { createWord, loadWordFB } from "./redux/modules/word";
import {db} from "./firebase"
import { collection, doc, getDoc, getDocs, addDoc } from "firebase/firestore";

function App() {
  const dispatch = useDispatch();
  React.useEffect(()=> {
    dispatch(loadWordFB());
  }, []);

  return (
    <div className="App">
      <header>
        <Link to="/">
          <h1>나만의 사전</h1>
        </Link>
      </header>
      <Route exact path="/">
        <Home></Home>
        <Link to="/add">
          <div className='addPage'>
            <span></span>
            <span></span>
          </div>
        </Link>
      </Route>
      <Route exact path="/add">
        <Add></Add>
      </Route>
      <Route exact path="/update/:id">
        <Update></Update>
      </Route>
    </div>
  );
}

export default App;
