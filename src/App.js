import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Home = () => <h1>Home</h1>;

const About = () => <h1>About</h1>;

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} /> 
      <Route path="/about" component={About} /> 
      <Route strict path="/about/" render={() => <h1>About 1</h1>} /> 
      <Route path="/info" children={({ match }) => match && <h1>Info</h1>} /> 
    </div>
  </Router>
);

export default App;
