import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Link,
  NavLink,
  Switch,
} from 'react-router-dom';

import './App.css';

const isActiveFunc = (match, location) => {
  console.log(match, location);
  return match;
};

const Home = () => <h1>Home</h1>;

const About = () => <h1>About</h1>;

const Header = ({ match }) => (
  <div className="header">
    <Route path="/multi/:param" render={() => <h1>Header</h1>} />
  </div>
);

const Body = ({ match }) => (
  <div className="body">
    <Route path="/multi/:param" render={() => <h1>Body</h1>} />
  </div>
);

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
    <NavLink to="/query/?id=123">Query</NavLink>
    <NavLink to={{ pathname: '/query',  search: '?id=456' }}>Pathname</NavLink>
    <NavLink to="/notfound">Not found</NavLink>
    <NavLink to="/multi/example">Multiple</NavLink>
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
      <Switch>
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
        <Route path="/query" render={({ match, location }) => (
          <div>
            <p>root</p>
            <p>{JSON.stringify(match)}</p>
            <p>{JSON.stringify(location)}</p>
            <p>{new URLSearchParams(location.search).get('id')}</p>
          </div>
        )} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
      <Header />
      <Body />
    </div>
  </Router>
);

export default App;
