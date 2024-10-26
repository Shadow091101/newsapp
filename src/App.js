
import './App.css';

import React, { Component, useState,useEffect } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const App = (props) => {
  // console.log()
  const apiKey = process.env.REACT_APP_NEWS_API

  const [drop_down_title, setDrop_down_title] = useState("Category")
  const [searchText, setSearchText] = useState('')
  const [progress, setProgress] = useState(0);

  // Function to update the dropdown title based on the selected category
  const updateDropDownTitle = (newTitle) => {
    setDrop_down_title(newTitle)
  }

  const updateSearchText = (searchText) => {
    setSearchText(searchText);
    console.log('Searched text=', searchText);

  }
  const updateProgress = (value) => {
    setProgress(value)
  }

  


  return (
    <div>
      <Router>

        <Navbar drop_down_title={drop_down_title} updateSearchText={updateSearchText} />
        <LoadingBar
          color='#f11946'
          height={4}
          progress={progress}
          onLoaderFinished={() => updateProgress(0)}
        />
        <Routes>

          <Route exact path='/' element={<News key={searchText + "home"} updateProgress={updateProgress} category="general" title='Top-HeadLines' updateSearchText={updateSearchText} apiKey={apiKey} updateDropDownTitle={updateDropDownTitle} />} />

          <Route exact path='/business' element={<News key={searchText + "business"} updateProgress={updateProgress} category="business" title='Business' updateSearchText={updateSearchText} apiKey={apiKey} query={searchText} updateDropDownTitle={updateDropDownTitle} />} />
          <Route exact path='/entertainment' element={<News key={searchText + "entertainment"} updateProgress={updateProgress} category="entertainment" updateSearchText={updateSearchText} apiKey={apiKey} query={searchText} title='Entertainment' updateDropDownTitle={updateDropDownTitle} />} />
          <Route exact path='/general' element={<News key={searchText + "general"} updateProgress={updateProgress} category="general" title='General' updateSearchText={updateSearchText} apiKey={apiKey} query={searchText} updateDropDownTitle={updateDropDownTitle} />} />
          <Route exact path='/health' element={<News key={searchText + "health"} updateProgress={updateProgress} category="health" title='Health' updateSearchText={updateSearchText} apiKey={apiKey} query={searchText} updateDropDownTitle={updateDropDownTitle} />} />
          <Route exact path='/science' element={<News key={searchText + "science"} updateProgress={updateProgress} category="science" title='Science' updateSearchText={updateSearchText} apiKey={apiKey} query={searchText} updateDropDownTitle={updateDropDownTitle} />} />
          <Route exact path='/sports' element={<News key={searchText + "sports"} updateProgress={updateProgress} category="sports" title='Sports' updateSearchText={updateSearchText} apiKey={apiKey} query={searchText} updateDropDownTitle={updateDropDownTitle} />} />
          <Route exact path='/technology' element={<News key={searchText + "technology"} updateProgress={updateProgress} category="technology" title='Technology' updateSearchText={updateSearchText} apiKey={apiKey} query={searchText} updateDropDownTitle={updateDropDownTitle} />} />
        </Routes>

      </Router>
    </div>
  )

}
export default App;
