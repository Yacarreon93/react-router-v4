import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Link,
  NavLink,
} from 'react-router-dom';

import './App.css';

const isActiveFunc = (match, location) => {
  console.log(match, location);
  return match;
};

const Home = () => <h1>Home</h1>;

const About = () => <h1>About</h1>;

const NavLinks = () => (
  <nav>
    <NavLink exact activeClassName="active" to="/">Home</NavLink>
    <NavLink activeStyle={{ color: 'green' }} to={{ pathname: '/about' }}>About</NavLink>
    <NavLink 
      isActive={isActiveFunc} 
      activeClassName="active"
      to={{ pathname: '/about/sub' }}
    >
      About Sub
    </NavLink>
  </nav>
);

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
      <NavLinks />
      <Route exact path="/" component={Home} /> 
      <Route path="/about" component={About} /> 
      <Route strict path="/contact/" render={() => <h1>Contact</h1>} /> 
      <Route path="/info" children={({ match }) => match && <h1>Info</h1>} />
      <Route path="/page/:page?/:subpage?" render={({ match }) => (
        <h1>
          PAGE: {match.params.page || 'home'}<br />
          SUBPAGE: {match.params.subpage}
        </h1>
      )} /> 
      <Route path="/page2/:page?-:subpage?" render={({ match }) => (
        <h1>
          PAGE: {match.params.page || 'home'}<br />
          SUBPAGE: {match.params.subpage}
        </h1>
      )} />
      <Route path="/:a(\d+)/:b" render={({ match }) => (
        <h1>
          Param A: {match.params.a}<br />
          Param B: {match.params.b}
        </h1>
      )} />
      <Route path="/:a(\d{2}-\d{2}-\d{4})/:b" render={({ match }) => (
        <h1>
          Param A: {match.params.a}<br />
          Param B: {match.params.b}
        </h1>
      )} />
      <Route path="/:a(\d{2}-\d{2}-\d{4}):b(\.[a-z]+)?" render={({ match }) => (
        <h1>
          Param A: {match.params.a}<br />
          Param B: {match.params.b}
        </h1>
      )} />
    </div>
  </Router>
);

export default App;
