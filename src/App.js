import './App.css';
import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Bookmarks from './components/Bookmarks';
import History from "./components/History";


const App = () => {
  // console.log()

  const apiKey = process.env.REACT_APP_NEWS_API
  const location = useLocation();
  const navigate = useNavigate();
  const [drop_down_title, setDrop_down_title] = useState("Category")
  const [searchText, setSearchText] = useState('')
  const [progress, setProgress] = useState(0);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

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


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && location.pathname !== "/signup" && location.pathname !== "/login") {
      navigate('/login');
    }
    setIsAuthChecked(true);
  }, [location.pathname, navigate])
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";
  if (!isAuthChecked) return null;
  return (
    <div>
      {!hideNavbar && (
        <Navbar drop_down_title={drop_down_title} updateSearchText={updateSearchText} />
      )}
      <LoadingBar
        color='#f11946'
        height={4}
        progress={progress}
        onLoaderFinished={() => updateProgress(0)}
      />
      <Routes>
        <Route exact path='/' element={<News key={searchText + "home"} query={searchText} updateProgress={updateProgress} category="general" title='Top-HeadLines' updateSearchText={updateSearchText} apiKey={apiKey} updateDropDownTitle={updateDropDownTitle} />} />
        <Route exact path='/login' element={<Login></Login>} />
        <Route exact path='/signup' element={<Signup></Signup>} />
        <Route exact path='/business' element={<News key={searchText + "business"} updateProgress={updateProgress} category="business" title='Business' updateSearchText={updateSearchText} apiKey={apiKey} query={searchText} updateDropDownTitle={updateDropDownTitle} />} />
        <Route exact path='/entertainment' element={<News key={searchText + "entertainment"} updateProgress={updateProgress} category="entertainment" updateSearchText={updateSearchText} apiKey={apiKey} query={searchText} title='Entertainment' updateDropDownTitle={updateDropDownTitle} />} />
        <Route exact path='/general' element={<News key={searchText + "general"} updateProgress={updateProgress} category="general" title='General' updateSearchText={updateSearchText} apiKey={apiKey} query={searchText} updateDropDownTitle={updateDropDownTitle} />} />
        <Route exact path='/health' element={<News key={searchText + "health"} updateProgress={updateProgress} category="health" title='Health' updateSearchText={updateSearchText} apiKey={apiKey} query={searchText} updateDropDownTitle={updateDropDownTitle} />} />
        <Route exact path='/science' element={<News key={searchText + "science"} updateProgress={updateProgress} category="science" title='Science' updateSearchText={updateSearchText} apiKey={apiKey} query={searchText} updateDropDownTitle={updateDropDownTitle} />} />
        <Route exact path='/sports' element={<News key={searchText + "sports"} updateProgress={updateProgress} category="sports" title='Sports' updateSearchText={updateSearchText} apiKey={apiKey} query={searchText} updateDropDownTitle={updateDropDownTitle} />} />
        <Route exact path='/technology' element={<News key={searchText + "technology"} updateProgress={updateProgress} category="technology" title='Technology' updateSearchText={updateSearchText} apiKey={apiKey} query={searchText} updateDropDownTitle={updateDropDownTitle} />} />
        <Route exact path='/bookmarks' element={<Bookmarks />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  )
};
export default App;
