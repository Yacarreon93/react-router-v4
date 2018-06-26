import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Link,
} from 'react-router-dom';

const Home = () => <h1>Home</h1>;

const About = () => <h1>About</h1>;

const Links = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to={{ pathname: '/about' }}>About</Link>
    <Link to="/contact/">Contact</Link>
    <Link replace to="/info">Info</Link>
  </nav>
);

const App = () => (
  <Router>
    <div>
      <Links />
      <Route exact path="/" component={Home} /> 
      <Route path="/about" component={About} /> 
      <Route strict path="/contact/" render={() => <h1>Contact</h1>} /> 
      <Route path="/info" children={({ match }) => match && <h1>Info</h1>} /> 
    </div>
  </Router>
);

export default App;
