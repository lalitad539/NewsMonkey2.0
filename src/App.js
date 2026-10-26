import './App.css';

import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'


import{
  BrowserRouter as Router ,
  Routes,
  Route,

}
  from "react-router-dom";

export default class App extends Component {
  pageSize = 5;
apiKey= process.env.REACT_APP_NEWS_API
  constructor(props){
super(props);
  
this.state = {
   progress:0
};
  }

setProgress = (progress) => {
  this.setState({progress: progress})
}
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
          color="#f11946"
          height={4}
        progress={this.state.progress}
      />
        <Routes>
        <Route path="/"element={<News setProgress={this.setProgress}  key="general" pageSize={5} country='us' category="general" apiKey={this.apiKey}/>}/>
        <Route path="/business" element={<News setProgress={this.setProgress}  key="business" pageSize={5} country="us" category="business" apiKey={this.apiKey}/>}/>
        <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={5} country='us' category="entertainment" apiKey={this.apiKey}/>}/>
        <Route path="/general" element={<News setProgress={this.setProgress}  key="general" pageSize={5} country='us' category="general" apiKey={this.apiKey}/>}/>
        <Route path="/health" element={<News setProgress={this.setProgress}  key="health" pageSize={5} country='us' category="health" apiKey={this.apiKey}/>}/>
        <Route path="/science" element={<News setProgress={this.setProgress}  key="science" pageSize={5} country='us' category="science" apiKey={this.apiKey}/>}/>
        <Route path="/sports" element={<News setProgress={this.setProgress}  key="sports" pageSize={5} country='us' category="sports"apiKey={this.apiKey}/>}/>
        <Route path="/technology" element ={<News setProgress={this.setProgress}  key="technology" pageSize={5} country='us' category="technology" apiKey={this.apiKey}/>}/>
        </Routes>
        </Router>
      </div>
    )
  }
}

