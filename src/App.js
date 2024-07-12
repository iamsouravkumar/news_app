import './App.css';

import React, { useState } from 'react'

import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

const App = () => {
  const pageSize = 12;
  const apikey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
  const [mode, setMode] = useState('light')
  const [text, setText] = useState('Enable Dark Mode')
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark')
      document.body.style.backgroundColor = 'black'
      document.body.style.color = 'white'
      if (text === 'Enable Dark Mode') {
        setText('Disable Dark Mode')
      }
    }

    else if (mode === 'dark') {
      setMode('light')
      document.body.style.backgroundColor = 'white'
      document.body.style.color = 'black'
      if (text === 'Disable Dark Mode') {
        setText('Enable Dark Mode')
      }
    }
    else {
      setMode('light')
    }
  }

  return (
    <div>
      <Router>
        <Navbar mode={mode} toggleMode={toggleMode} />
        <LoadingBar
          color='#f11946'
          progress={progress} mode={mode}
        />
        <Switch>
          <Route exact path="/"><News setProgress={setProgress} apikey={apikey} key='general' pageSize={pageSize} country='in' category='general' /></Route>
          <Route exact path="/business"><News setProgress={setProgress} apikey={apikey} key='business' pageSize={pageSize} country='in' category='business' /></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} apikey={apikey} key='entertainment' pageSize={pageSize} country='in' category='entertainment' /></Route>
          <Route exact path="/general"><News setProgress={setProgress} apikey={apikey} key='general' pageSize={pageSize} country='in' category='general' /></Route>
          <Route exact path="/health"><News setProgress={setProgress} apikey={apikey} key='health' pageSize={pageSize} country='in' category='health' /></Route>
          <Route exact path="/science"><News setProgress={setProgress} apikey={apikey} key='science' pageSize={pageSize} country='in' category='science' /></Route>
          <Route exact path="/sports"><News setProgress={setProgress} apikey={apikey} key='sports' pageSize={pageSize} country='in' category='sports' /></Route>
          <Route exact path="/technology"><News setProgress={setProgress} apikey={apikey} key='technology' pageSize={pageSize} country='in' category='technology' /></Route>
        </Switch>
      </Router>
    </div>
  )
}
export default App;
