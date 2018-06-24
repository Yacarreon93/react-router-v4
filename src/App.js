import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Home = () => <h1>Home</h1>;

const About = () => <h1>About</h1>;

const App = () => (
  <Router>
    <div>
      <Route path="/" component={Home} /> 
      <Route path="/about" component={About} /> 
    </div>
  </Router>
);

export default App;
